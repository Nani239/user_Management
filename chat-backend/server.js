const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware to serve static files (optional)
app.use(express.static("public"));

// Handle root route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log("A user connected");
  // Handle incoming messages
  socket.on("send_message", (message) => {
    console.log("Message received:", message);
    io.emit("receive_message", message); // Broadcast message to all connected clients
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
