import express from "express";
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.js"; // <-- Add this line


const router = express.Router();
router.post("/signup", upload.single("profilePic"), signup);
router.put("/update-profile", protectRoute, upload.single("profilePic"), updateProfile);

router.post("/login", login);
router.post("/logout", logout);



router.get("/check", protectRoute, checkAuth);

export default router;
