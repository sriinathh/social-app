import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"], // Frontend URL
  },
});

// Map to store online users: { userId: socketId }
const userSocketMap = {};

// Function to get socket ID for a given userId
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// Event listener for new socket connections
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  // Retrieve userId from query parameters
  const userId = socket.handshake.query.userId;
  
  if (userId) {
    userSocketMap[userId] = socket.id;
  } else {
    console.log("No userId provided for socket", socket.id);
  }

  // Emit updated list of online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Handle socket disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    if (userId) {
      delete userSocketMap[userId];
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server, userSocketMap };
