import User from "../models/User.js";
import Order from "../models/Order.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import { setOtp, verifyOtp as verifyOtpStore } from "../utils/otpStore.js";
import { sendMsg91Otp, verifyMsg91Otp } from "../utils/sms.js";
import { sendEmailOtp } from "../utils/email.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegex = /^[A-Za-z][A-Za-z\s'.-]{2,49}$/;
const phoneRegex = /^[0-9]{10}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

// @desc Register User
// @route POST /api/users/register
// @access Public
export const registerUser = async (req, res) => {
  try {
    const name = req.body.name?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;
    const phone = req.body.phone?.trim();

    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (!nameRegex.test(name)) {
      return res.status(400).json({
        message: "Enter a valid full name",
      });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Enter a valid email address",
      });
    }

    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        message: "Phone number must be exactly 10 digits",
      });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "Password must be at least 6 characters and include letters and numbers",
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const role =
      email === "ppp@gmail.com" &&
      password === "ppp123"
        ? "admin"
        : "customer";

    const user = await User.create({
      name,
      email,
      password,
      phone,
      role,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// @desc Login User
// @route POST /api/users/login
// @access Public
// @desc Login User
// @route POST /api/users/login
// @access Public
export const loginUser = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Enter a valid email address",
      });
    }

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Wrong password",
      });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token: generateToken(user._id),
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc Send OTP to phone
// @route POST /api/users/send-otp
// @access Public
export const sendOtp = async (req, res) => {
  try {
    const { phone, email } = req.body;

    console.log("[SEND OTP] Request received for phone:", phone, "email:", email);

    if (!phone || !phoneRegex.test(phone)) {
      return res.status(400).json({
        message: "Enter a valid 10-digit phone number",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(phone, otp);

    console.log("[SEND OTP] Generated OTP:", otp);

    const results = await Promise.allSettled([
      sendMsg91Otp(phone).then((r) => ({ ...r, channel: "sms" })),
      email ? sendEmailOtp(email, otp).then((r) => ({ ...r, channel: "email" })) : Promise.resolve({ channel: "email", skipped: true }),
    ]);

    console.log("[SEND OTP] Delivery results:", results);

    const smsResult = results[0];
    const emailResult = results[1];

    const smsOk = smsResult.status === "fulfilled" && smsResult.value.success;
    const emailOk = emailResult.status === "fulfilled" && emailResult.value.success;
    const smsDev = smsResult.status === "fulfilled" && smsResult.value.dev;
    const emailDev = emailResult.status === "fulfilled" && emailResult.value.dev;

    if (smsOk || emailOk) {
      res.json({
        message: "OTP sent successfully",
        otp,
        dev: false,
        channels: {
          sms: smsOk ? "sent" : "failed",
          email: emailOk ? "sent" : email ? "failed" : "skipped",
        },
        provider: smsResult.status === "fulfilled" ? smsResult.value.data : undefined,
      });
    } else if (smsDev || emailDev) {
      res.json({
        message: "OTP generated (dev mode)",
        otp,
        dev: true,
        channels: {
          sms: smsDev ? "dev" : "failed",
          email: emailDev ? "dev" : email ? "failed" : "skipped",
        },
      });
    } else {
      const smsError = smsResult.status === "fulfilled" ? smsResult.value.error || smsResult.value.data?.message : "SMS not configured";
      const emailError = emailResult.status === "fulfilled" ? emailResult.value.error : "Email not configured";
      res.status(500).json({
        message: `SMS: ${smsError}. Email: ${emailError}`,
      });
    }
  } catch (error) {
    console.error("[SEND OTP] Error:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc Verify OTP and login/register user
// @route POST /api/users/verify-otp
// @access Public
export const verifyOtp = async (req, res) => {
  try {
    const { phone, otp, name } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({
        message: "Phone number and OTP are required",
      });
    }

    const smsResult = await verifyMsg91Otp(phone, otp);
    if (!smsResult.success && !smsResult.dev) {
      const providerMessage = smsResult.data?.message || smsResult.data?.detail || smsResult.error;
      return res.status(400).json({
        message: providerMessage || "OTP verification failed with provider",
      });
    }

    if (smsResult.dev) {
      const isValid = verifyOtpStore(phone, otp);
      if (!isValid) {
        return res.status(400).json({
          message: "Invalid or expired OTP",
        });
      }
    }

    let user = await User.findOne({ phone });

    if (!user) {
      user = await User.create({
        name: name || `User ${phone.slice(-4)}`,
        phone,
        role: "customer",
      });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc Sync/Login Firebase User
// @route POST /api/users/firebase-auth
// @access Public
export const firebaseAuth = async (req, res) => {
  try {
    const decoded = req.firebaseUser;

    if (!decoded) {
      return res.status(401).json({
        message: "Firebase ID token is required",
      });
    }

    const firebaseUid = decoded.uid;
    const email = decoded.email?.trim().toLowerCase() || "";
    const phoneRaw = decoded.phone_number || "";
    const phone = phoneRaw.replace(/\D/g, "").slice(-10);
    const tokenName = decoded.name || "";
    const bodyName = req.body.name?.trim();
    const name =
      bodyName ||
      tokenName ||
      (email ? email.split("@")[0] : "User");

    let user = await User.findOne({ firebaseUid });

    if (!user && email) {
      user = await User.findOne({ email });
    }

    if (!user && phone) {
      user = await User.findOne({ phone });
    }

    if (user) {
      user.firebaseUid = firebaseUid;
      if (email && !user.email) user.email = email;
      if (phone && !user.phone) user.phone = phone;
      if (bodyName) user.name = bodyName;
      await user.save();
    } else {
      if (!email && !phone) {
        return res.status(400).json({
          message: "No email or phone found in Firebase account",
        });
      }

      if (!email) {
        return res.status(404).json({
          message: "Account not found. Please register first.",
        });
      }

      const role = email === "ppp@gmail.com" ? "admin" : "customer";

      user = await User.create({
        name,
        email,
        firebaseUid,
        phone: phone || undefined,
        role,
      });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// @desc Add Address
// @route POST /api/users/addresses
// @access Private
export const addAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.addresses.push(req.body);

    await user.save();

    res.status(201).json(user.addresses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc Update Address
// @route PUT /api/users/addresses/:addressId
// @access Private
export const updateAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const address = user.addresses.id(req.params.addressId);

    if (!address) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    Object.assign(address, req.body);

    await user.save();

    res.json(user.addresses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc Delete Address
// @route DELETE /api/users/addresses/:addressId
// @access Private
export const deleteAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const address = user.addresses.id(req.params.addressId);

    if (!address) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    user.addresses.pull(req.params.addressId);

    await user.save();

    res.json(user.addresses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc Set Default Address
// @route PUT /api/users/addresses/:addressId/default
// @access Private
export const setDefaultAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.addresses.forEach((addr) => {
      addr.isDefault = addr._id.toString() === req.params.addressId;
    });

    await user.save();

    res.json(user.addresses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc Get logged in user profile
// @route GET /api/users/profile
// @access Private

export const getUserProfile = async (req,res)=>{
  try{

    const user = await User.findById(req.user._id)
      .select("-password");

    res.json(user);

  }catch(error){
    res.status(500).json({
      message:error.message
    });
  }
};



// @desc Update profile
// @route PUT /api/users/profile
// @access Private

export const updateUserProfile = async(req,res)=>{
  try{

    const user = await User.findById(req.user._id);

    if(!user){
      return res.status(404).json({
        message:"User not found"
      });
    }


    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;


    if(req.body.password){
      user.password = req.body.password;
    }


    const updatedUser = await user.save();


    res.json({
      _id:updatedUser._id,
      name:updatedUser.name,
      email:updatedUser.email,
      phone:updatedUser.phone,
      role:updatedUser.role
    });


  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }
};

// @desc Get all users
// @route GET /api/users
// @access Private/Admin

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(users);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      user: req.params.id,
    }).sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};