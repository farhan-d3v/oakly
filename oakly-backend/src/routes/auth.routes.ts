import express from "express";
import { register, login, verifyOtp, getMe } from "../controllers/auth.controller";
import { auth } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.get("/me", auth, getMe);

export default router;
