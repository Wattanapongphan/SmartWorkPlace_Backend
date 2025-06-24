const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userSchema = require('../models/user.model');
const RefreshToken = require('../models/refreshToken.model');

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user already exists
        const existingUser = await userSchema.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 8);
        const newUser = new userSchema({ email, password: hashedPassword });
        await newUser.save();
        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error registering user', error });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await userSchema.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate access token
        const accessToken = jwt.sign({ id: user._id }, 'access-secret', { expiresIn: '15m' });
        // Generate refresh token
        const refreshToken = jwt.sign({ id: user._id}, 'refresh-secret', { expiresIn: '7d' });

        // Save refresh token in database
        const newRefreshToken = new RefreshToken({
            token: refreshToken,
            user_id: user._id,
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
        });

        await newRefreshToken.save();

        return res.status(200).json({
            message: 'Login successful',
            accessToken,
            refreshToken
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error logging in', error });
    }
};

exports.refreshToken = async (req, res) => {
    try {
        const { token } = req.body;

        // Find the refresh token in the database
        const refreshToken = await RefreshToken.findOne({ token });
        if (!refreshToken || refreshToken.revoked) {
            return res.status(403).json({ message: 'Invalid or revoked refresh token' });
        }

        // Check if the token is expired
        if (refreshToken.expires_at < new Date()) {
            return res.status(403).json({ message: 'Refresh token expired' });
        }

        // Generate new access token
        const accessToken = jwt.sign({ id: refreshToken.user_id }, 'access-secret', { expiresIn: '15m' });

        const payload = jwt.verify(token, 'refresh-secret');
        // Generate new refresh token
        const newRefreshToken = jwt.sign({ id: payload.id } , 'refresh-secret', { expiresIn: '7d' });

        // await RefreshToken.findByIdAndUpdate(refreshToken._id, {
        //     token: newRefreshToken,
        //     expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        //     revoked: false
        // });

        await RefreshToken.create({
            token: newRefreshToken,
            user_id: refreshToken.user_id,
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
            revoked: false
        });

        await RefreshToken.deleteOne({ _id: refreshToken._id });

        return res.status(200).json({
            message: 'Access token refreshed successfully',
            accessToken,
            newRefreshToken
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error refreshing token', error });
    }
};


exports.logout = async (req, res) => {
  try {
    await RefreshToken.deleteOne({ token: req.body.token });
    return res.json({ message: 'Logged out' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error logging out', error });
  }
}

exports.protectedRoute = (req, res) => {
    try {
        // console.log(req.user); 
        // // User info from auth middleware
        return res.status(200).json({ 
            message: `Hello ${req.user.id}, you have access to this protected route!`, 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error accessing protected route', error });
    }
};
