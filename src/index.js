// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const presentationRoutes = require('./routes/presentationRoutes');

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', presentationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

