const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../middleware/authMiddleware')

const authController = require('../controllers/auth.controller');

router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.get('/me', authMiddleware , (req, res) => {
  res.status(200).json({ message: 'You are logged in', user: req.user });
});


module.exports = router; 