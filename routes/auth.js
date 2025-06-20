const express = require('express');
const router = express.Router();
const { register, login, refreshToken, logout , protectedRoute} = require('../controllers/auth.controller');
const auth = require('../middlewares/auth.middleware');

// Register route
router.post('/register', register);
// Login route
router.post('/login', login);
// Refresh token route
router.post('/refresh-token', refreshToken);
// Logout route
router.post('/logout', logout);
// Protected route
router.get('/protected', auth, protectedRoute);

// Export the router
module.exports = router;
