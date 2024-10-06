const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Import auth routes

// Load environment variables
dotenv.config();

// Initialize the Express application
const app = express();  // Make sure this comes BEFORE using `app.use`

// Middleware
app.use(express.json()); // Body parser middleware
app.use(cors());         // Enable Cross-Origin Resource Sharing

// Routes
app.use('/api/auth', authRoutes);  // Use the routes AFTER `app` is initialized

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
