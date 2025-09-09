import jwt from "jsonwebtoken";
import crypto from "crypto";
import { User } from "../models/user.model.js";

// Google OAuth callback handler
export const googleCallback = async (req, res) => {
  try {
    // Generate JWT access token
    const accessToken = jwt.sign(
      { id: req.user._id, email: req.user.email, name: req.user.name },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    // Generate refresh token
    const refreshToken = crypto.randomBytes(40).toString("hex");
    req.user.refreshToken = refreshToken;
    await req.user.save();

    // Instead of setting cookies, send tokens as custom headers
    res.setHeader("accessToken", accessToken);
    res.setHeader("refreshToken", refreshToken);

    // Optionally, send a JSON response body as well
    res.json({
      message: "Tokens sent in headers",
    });
    
  } catch (err) {
    console.error(err);
    res.redirect("/login");
  }
};

// Refresh token
export const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) return res.status(400).json({ message: "No refresh token provided" });

    const user = await User.findOne({ refreshToken });
    if (!user) return res.status(401).json({ message: "Invalid refresh token" });

    const newAccessToken = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.status(200).json({ message: "Access token refreshed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Logout user by deleting refresh token
export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res.status(400).json({ message: "No refresh token provided" });
    }

    const user = await User.findOne({ refreshToken });
    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // Remove refresh token in DB
    user.refreshToken = null;
    await user.save();

    // Clear cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
