import User from "../models/User.js";
import Order from "../models/Order.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

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