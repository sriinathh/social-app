import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

dotenv.config();

import connectDB from "./lib/db.js"; // ✅ Default import (no curly braces)
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// ✅ Middleware to handle large payload sizes for file uploads
app.use(express.json({ limit: '10mb' })); // For JSON requests, allows larger payloads
app.use(express.urlencoded({ limit: '10mb', extended: true })); // For form data (uploads)
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// ✅ Connect to DB first, then start server
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log("✅ Server is running on PORT: " + PORT);
  });
}).catch((error) => {
  console.error("❌ Failed to start server due to DB error:", error);
});
