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

    const user = {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    };

    // Send an HTML page that posts message back to opener
    res.send(`
      <html>
        <body>
          <script>
            window.opener.postMessage(
              {
                type: "LOGIN_SUCCESS",
                user: ${JSON.stringify(user)},
                accessToken: "${accessToken}",
                refreshToken: "${refreshToken}"
              },
              "${process.env.CORS_ORIGIN || "http://localhost:5173"}"
            );
            window.close();
          </script>
        </body>
      </html>
    `);
  } catch (err) {
    console.error(err);
    res.redirect("/login");
  }
};

// Refresh token
export const refreshAccessToken = async (req, res) => {
  try {
    // Get refresh token from headers (from frontend)
    const refreshToken = req.headers["x-refresh-token"];
    if (!refreshToken) return res.status(400).json({ message: "No refresh token provided" });

    const user = await User.findOne({ refreshToken });
    if (!user) return res.status(401).json({ message: "Invalid refresh token" });

    const newAccessToken = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.status(200).json({ accessToken: newAccessToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Logout user by deleting refresh token
export const logout = async (req, res) => {
  try {
    const refreshToken = req.headers["x-refresh-token"];
    if (!refreshToken) {
      return res.status(400).json({ message: "No refresh token provided" });
    }

    const user = await User.findOne({ refreshToken });
    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    user.refreshToken = null;
    await user.save();

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

