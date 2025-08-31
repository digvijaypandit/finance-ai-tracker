import express from "express";
import passport from "passport";
import { googleCallback, refreshAccessToken, logout } from "../controllers/auth.controller.js";
import { getProfile } from "../controllers/profile.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Step 1: Trigger Google OAuth popup
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Step 2: Google OAuth callback
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), googleCallback);

// Refresh token endpoint
router.post("/refresh", refreshAccessToken);

// Logout endpoint
router.post("/logout", logout);

// Get the user profile
router.get("/profile", verifyJWT, getProfile);

export default router;
