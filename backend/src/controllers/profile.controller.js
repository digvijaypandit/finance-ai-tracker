import { User } from "../models/user.model.js";

// get user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-refreshToken -__v");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ profile: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
