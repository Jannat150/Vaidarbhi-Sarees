import nodemailer from "nodemailer";

const EMAIL_HOST = process.env.EMAIL_HOST || "";
const EMAIL_PORT = process.env.EMAIL_PORT || "";
const EMAIL_USER = process.env.EMAIL_USER || "";
const EMAIL_PASS = process.env.EMAIL_PASS || "";
const EMAIL_FROM = process.env.EMAIL_FROM || EMAIL_USER;

let transporter = null;

if (EMAIL_HOST && EMAIL_USER && EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: parseInt(EMAIL_PORT || "587", 10),
    secure: String(EMAIL_PORT || "587") === "465",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });
} else {
  console.warn("[EMAIL] Nodemailer not configured. Set EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS in .env");
}

export const sendEmailOtp = async (toEmail, otp) => {
  if (!transporter) {
    console.log(`[EMAIL] Not configured. Dev mode OTP for ${toEmail}: ${otp}`);
    return { success: false, dev: true };
  }

  try {
    const info = await transporter.sendMail({
      from: EMAIL_FROM,
      to: toEmail,
      subject: "Your OTP for Vaidarbhi Sarees",
      text: `Your OTP is ${otp}. It is valid for 5 minutes. Do not share it.`,
      html: `<p>Your OTP is <b>${otp}</b>. It is valid for 5 minutes. Do not share it.</p>`,
    });

    console.log(`[EMAIL] OTP sent to ${toEmail}:`, info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("[EMAIL] Failed to send OTP:", error);
    return { success: false, error: error.message };
  }
};
