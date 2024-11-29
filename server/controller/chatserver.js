const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Your frontend URL
    methods: ['GET', 'POST']
  }
});

// Socket.IO logic
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle receiving messages
  socket.on('send_message', (data) => {
    console.log('Message received:', data);
    io.to(data.receiverId).emit('receive_message', data); // Send to specific user
  });

  // Join specific rooms for admin and farmer
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room: ${roomId}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start server
const PORT = 4000;
server.listen(PORT, () => console.log(`Chat server running on http://localhost:${PORT}`));
