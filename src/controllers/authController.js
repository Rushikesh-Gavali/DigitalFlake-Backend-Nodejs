const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.formatResponse(400, 'User already exists');
  }

  const user = await User.create({ username, email, password });

  if (user) {
    return res.formatResponse(201, 'User registered successfully', {
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    return res.formatResponse(400, 'Invalid user data');
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    return res.formatResponse(200, 'User authenticated successfully', {
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    return res.formatResponse(401, 'Invalid email or password');
  }
});

module.exports = { registerUser, authUser };
