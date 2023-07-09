import express from "express";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

import { getNearbyCities } from "../controllers/exploreController.js";
import { getCountryData } from "../controllers/exploreController.js";

//Parent route - /explore

// 1. Nearby Cities
router.route("/nearby-cities").post(protect, getNearbyCities);
// 2. Get Country Data
router.route("/country-data").get(protect, getCountryData);

export default router;
