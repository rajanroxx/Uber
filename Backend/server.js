const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const http = require('http'); // 1. Import http module
const { Server } = require("socket.io"); // 2. Import Server class from socket.io

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Initialize express app
const app = express();

// Middlewares
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Body parser for JSON

// A simple welcome route
app.get('/', (req, res) => {
  res.send('Welcome to the Uber Clone API');
});

// Mount Routers
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/captains', require('./routes/captainRoutes'));

// --- NEW SERVER AND SOCKET.IO SETUP ---
const server = http.createServer(app); // 3. Create an HTTP server with our Express app

// 4. Initialize Socket.IO and attach it to the server
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for development. Be more specific in production!
    methods: ["GET", "POST"]
  }
});

// Handle Socket.io Connections (Core Logic)
io.on('connection', (socket) => {
  console.log(`A user connected: ${socket.id}`);

  // --- Core Logic Goes Here
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Define PORT
const PORT = process.env.PORT || 5000;

// --- MODIFIED: Start the server using the http server instance ---
server.listen(PORT, () => { // Note: we are using server.listen, not app.listen
  console.log(`Server is running on port ${PORT}`);
});