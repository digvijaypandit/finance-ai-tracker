import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

// Step 1: Trigger Google OAuth popup
router.post("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Step 2: Google redirects back to our callback URL
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // User is now authenticated (req.user contains MongoDB user)
    const token = jwt.sign(
      { id: req.user._id, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Send JWT back to frontend (here we redirect with token in query param)
    res.redirect(`http://localhost:3000/dashboard?token=${token}`);
  }
);

export default router;
