import { Request, Response } from "express";
import User from "../models/User.model";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.utils";
import { generateOTP } from "../utils/otp.utils";

// ------------------ REGISTER ------------------
export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  const otp = generateOTP();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

  const user = await User.create({
    email,
    password,
    otp,
    otpExpires,
  });

  return res.status(201).json({
    message: "OTP sent. Verify account.",
    otp,
  });
};

// ------------------ VERIFY OTP ------------------
export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  if (user.otp !== otp || user.otpExpires! < new Date())
    return res.status(400).json({ message: "Invalid or expired OTP" });

  user.isVerified = true;
  user.otp = null;
  user.otpExpires = null;
  await user.save();

  return res.json({ message: "Account verified" });
};

// ------------------ LOGIN ------------------
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const accessToken = generateAccessToken(user._id.toString());
  const refreshToken = generateRefreshToken(user._id.toString());

  return res.json({
    message: "Login success",
    accessToken,
    refreshToken,
  });
};

// ------------------ GET ME (PROTECTED) ------------------
export const getMe = async (req: Request, res: Response) => {
  const user = (req as any).user;
  return res.json({
    success: true,
    user,
  });
};
