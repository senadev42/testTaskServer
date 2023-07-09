import asyncHandler from "express-async-handler";

import { getCitiesNearMe } from "../GeoDB/citiesNearMe.js";

/**
 * Recieve a co-ordinate, and return a list of places nearby
 *
 * @route   POST /api/explore/nearby-cities
 * @access  Private
 */
const getNearbyCities = asyncHandler(async (req, res) => {
  const { coords, _id } = req.body;

  console.log("Recieved:" + coords);

  const cities = await getCitiesNearMe(coords);

  console.log("/api/explore/nearby-cities invoked");
  console.log(`Recieved co-ordinate ${coords} for ${_id}`);

  console.log(cities);

  res.send(cities);
});

export { getNearbyCities };
