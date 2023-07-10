import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

import { config } from "dotenv";
config();

const protect = asyncHandler(async (req, res, next) => {
  console.log("Attempting to protect");
  let token;

  // get token from cookies
  // broken because of hosting mechanism
  //token = req.cookies["testtaskcookie"];

  //get token from body
  token = req.body.authToken;

  //check if token in cookies from browser/request
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    //throw a forbidden otherwise
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protect };
