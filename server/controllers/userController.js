import asyncHandler from "express-async-handler";

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
  res.send("register user");
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