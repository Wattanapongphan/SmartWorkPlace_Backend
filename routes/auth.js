const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../middleware/authMiddleware')
const {register,login,logout} = require('../controllers/auth.controller');

router.post('/register',register);
router.post('/login',login);
router.post('/logout',logout);


router.get('/me', authMiddleware , (req, res) => {
  res.status(200).json({ message: 'You are logged in', user: req.user });
});


module.exports = router; 