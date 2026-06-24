const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const normalizeCredentials = (body = {}) => ({
  name: typeof body.name === "string" ? body.name.trim() : "",
  email: typeof body.email === "string" ? body.email.trim().toLowerCase() : "",
  password: typeof body.password === "string" ? body.password : "",
});

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = normalizeCredentials(req.body);

    if (name.length < 2 || !emailPattern.test(email) || password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Provide a valid name, email address, and password of at least 8 characters",
      });
    }

    const userExists = await User.exists({ email });
    if (userExists) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: passwordHash });

    return res.status(201).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = normalizeCredentials(req.body);

    if (!emailPattern.test(email) || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email }).select("+password");
    const isMatch = user ? await bcrypt.compare(password, user.password) : false;

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d", issuer: "project-shield" }
    );

    return res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};

module.exports = { registerUser, loginUser, getCurrentUser };
