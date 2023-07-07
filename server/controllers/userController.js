import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateJWT.js";

/**
 * Authenticate a user and return a token.
 *
 * @route   POST /api/users/auth
 * @access  Public
 */
const authUser = asyncHandler(async (req, res) => {
  res.send("auth user");
});

/**
 * Register a new user.
 *
 * @route   POST /api/users
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //check if user exists and throw error
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    res.status(400);
    throw new Error("Email already exists");
  }

  //check if user exists and throw error
  const usernameExists = await User.findOne({ name });
  if (usernameExists) {
    res.status(400);
    throw new Error("Username already exists");
  }

  //otherwise create user
  const user = await User.create({
    name,
    email,
    password,
  });

  generateToken(res, user._id);

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/**
 * Logout a user and clear their session.
 *
 * @route   POST /api/users/logout
 * @access  Public
 */
const logoutUser = (req, res) => {
  res.send("logout user");
};

/**
 * Retrieve the profile of the logged-in user.
 *
 * @route   GET /api/users/profile
 * @access  Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("get profile");
});

/**
 * Update the profile of the logged-in user.
 *
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update profile");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
