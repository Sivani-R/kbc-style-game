const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors'); // Add this line

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow requests from the frontend
    methods: ["GET", "POST"],
  },
});

// Use cors middleware
app.use(cors()); // Add this line

// Rest of your backend code

io.on('connection', (socket) => {
  console.log('A player connected');

  socket.on('correctAnswer', (player) => {
    console.log(`${player} answered correctly!`);
    io.emit('correctAnswer', `Congratulations ${player}!`);
  });

  socket.on('wrongAnswer', (player) => {
    console.log(`${player} answered incorrectly.`);
    socket.emit('wrongAnswer', 'Sorry, that is incorrect.');
  });

  socket.on('disconnect', () => {
    console.log('A player disconnected');
  });
});

server.listen(5000, () => {
  console.log('Server is running on port 5000');
});
