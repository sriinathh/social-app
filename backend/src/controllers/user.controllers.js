// controllers/user.controller.js
import User from "../models/user.model.js";

export const updateProfilePic = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from JWT (make sure auth middleware adds this)
    
    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imageUrl = req.file.path; // Cloudinary URL

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: imageUrl },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
};
