const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userSchema = require("../models/user.model");

exports.register = async (req, res) => {
  try {
    //check user
    const { username, password } = req.body;

    var user = await userSchema.findOne({ username });
    if (user) {
      return res.send("User already Exist !!").status(400);
    }

    // encrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new userSchema({
      username,
      password,hashedPassword
    });

    //save
    await user.save();
    res.send("Register Successful");
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const createToken = (userId) => {
      return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
    };

    //check user
    const user = await userSchema.findOne({ username });
    if (!user) {
      return res.status(401).json({
        message: "User not found"});
    }

console.log('password:', password);
console.log('hashed password:', user.password);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    console.log('bcrypt.compare result:', isMatch);

    const token = createToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true ,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.status(200).json({
      message: "Login successful",
      username: user.username,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true ,
      sameSite: "strict",
    });
    res.status(200).json({
      message: "Logout Successful",
    });
  } catch (err) {
    console.log(err);
  }
};
