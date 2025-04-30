const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

// Route to render the homepage
router.get('/', controller.getHomePage);

// Route to test MongoDB connection
router.get('/testCon', controller.testConnection);

// Route for registering a user
router.post('/api/register', controller.registerUser);

module.exports = router;
