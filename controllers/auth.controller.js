const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userSchema = require('../models/user.model')

exports.login = async(req, res) => {
    const { username, password} = req.body

    const createToken = (userId)=>{
        return jwt.sign({userId},process.env.JWT_SECRET, {expiresIn: '1h'})
    }

    const user = await userSchema.findOne({ username })
    if(!user){
        return res.status(401).json({
            message: "User not found",
            error: error.message
        })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        return res.status(401).json({
            message: "Invalid password",
        })
    }
    const token = createToken(user._id)

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
         maxAge: 60* 60 * 1000 // 1 hour
    });

    res.status(200).json({
        message: "Login successful",
        username: user.username
    })
}


exports.logout = async(req,res)=>{
    res.clearCookie('token',{
        httpOnly:true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    })
    res.status(200).json({
        message:"Logout Successful"
    })
}

