import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();
    res.json({ msg: "Registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Wrong password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Forgot Password
router.post("/forgot", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const resetToken = Math.random().toString(36).substring(2);
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
    await user.save();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });

    const link = `http://localhost:5173/reset/${resetToken}`;
    await transporter.sendMail({
      to: user.email,
      subject: "Password Reset",
      html: `<div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 40px; text-align: center;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      <div style="background: linear-gradient(90deg, #4f46e5, #3b82f6); padding: 20px;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px;">Password Reset Request</h1>
      </div>

      <div style="padding: 30px; text-align: left; color: #333333;">
        <p style="font-size: 16px; margin-bottom: 20px;">Hello ${user.name || "User"},</p>
        <p style="font-size: 15px; line-height: 1.6;">
          We received a request to reset your password. Click the button below to reset it. 
          This link will expire in <b>1 hour</b>.
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${link}" 
            style="background-color: #4f46e5; color: white; text-decoration: none; padding: 14px 28px; border-radius: 8px; display: inline-block; font-weight: bold; font-size: 15px;">
            Reset Password
          </a>
        </div>

        <p style="font-size: 14px; color: #555;">
          If you didn’t request a password reset, you can safely ignore this email.
        </p>
      </div>

      <div style="background-color: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; color: #777;">
        © ${new Date().getFullYear()} [Your App Name]. All rights reserved.<br/>
        <a href="https://www.yourwebsite.com" style="color: #4f46e5; text-decoration: none;">Visit Website</a>
      </div>
    </div>
  </div>
`
    });

    res.json({ msg: "Reset link sent to email" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Reset Password
router.post("/reset/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ msg: "Invalid or expired token" });

    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ msg: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ msg: "Welcome to dashboard", user: req.user });
});

export default router;
