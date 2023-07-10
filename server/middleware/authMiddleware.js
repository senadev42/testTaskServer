import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

import { config } from "dotenv";
config();

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // get token from cookies
  token = req.cookies[process.env.JWT_COOKIE_NAME];

  //check if token in cookies from browser/request
  if (token) {
    try {
      //decode the cookie
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //check if the cookie belong to a user
      req.user = await User.findById(decoded.userId).select("-password");

      //move along
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
