import express from "express";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

import { getNearbyCities } from "../controllers/exploreController.js";

//Parent route - /explore

// 1. Nearby Cities
router.route("/nearby-cities").post(protect, getNearbyCities);

export default router;
