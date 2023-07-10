import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

import jwt from "jsonwebtoken";

/**
 * Authenticate a user and return a token.
 *
 * @route   POST /api/users/auth
 * @access  Public
 */
const authUser = asyncHandler(async (req, res) => {
  console.log("User trying to log in:");
  const { email, password } = req.body;

  console.log(`with ${email} and ${password}`);

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("Invalid email");
  }

  let userId = user._id;
  console.log("User ID: " + userId);

  if (await user.matchPassword(password)) {
    console.log("Generating cookie based on " + process.env.JWT_SECRET);
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    //FIXME

    console.log("Sending cookie: in " + process.env.NODE_ENV + " mode");

    res.cookie("testtaskcookie", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    console.log(res.getHeaders()["set-cookie"]);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid password");
  }
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

  let userId = user._id;

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("testtaskcookie", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
  });

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
  res.cookie("testtaskcookie", "", {
    httpOnly: true,
    expires: new Date(0),
    maxAge: 0,
  });

  res.status(200).json({ message: "Logged out successfully" });
};

/**
 * Retrieve the profile of the logged-in user.
 *
 * @route   GET /api/users/profile
 * @access  Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  if (req.user) {
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * Update the profile of the logged-in user.
 *
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
