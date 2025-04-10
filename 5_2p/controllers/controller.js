const User = require('../models/User');
const path = require("path");

const getHomePage = (req, res) => {
    res.sendFile(path.join(__dirname, "../views/index.html"));
};

const testConnection = (req, res) => {
  res.send('MongoDB is connected!');
};

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getHomePage,
  testConnection,
  registerUser,
};
