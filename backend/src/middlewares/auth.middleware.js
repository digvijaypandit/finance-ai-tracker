import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;
    if (!token) return res.status(401).json({ error: "Unauthorized - No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ensure user still has refresh token (i.e., not logged out)
    const user = await User.findById(decoded.id);
    if (!user || !user.refreshToken) {
      return res.status(401).json({ error: "Unauthorized - Logged out" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error("❌ JWT verification failed:", err.message);
    return res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
};
