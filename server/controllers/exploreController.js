import asyncHandler from "express-async-handler";
import CountrySearch from "../models/countrySearchQueryModel.js";

//geodb utility functions
import { getCitiesNearMe } from "../GeoDB/citiesNearMe.js";
import { getCountryDetails } from "../GeoDB/countryData.js";

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

/**
 * Recieve an iso Country Code and return information about that country
 *
 * @route   POST /api/explore/country-data
 * @access  Private
 */
const getCountryData = asyncHandler(async (req, res) => {
  console.log(`Get country data invoked by ${req.ip} `);
  const { countryCode, query_user_id } = req.body;

  let countryData = await getCountryDetails(countryCode);

  console.log("\nRecieved:" + countryCode);
  console.log("From: " + query_user_id);

  //return request data to user
  res.send(countryData);

  console.log(
    `Adding ${countryCode} country search  by ${query_user_id} to the database ...`
  );
  //log country search query
  const countrySearch = await CountrySearch.create({
    countryCode,
    query_user_id,
  });
  console.log("Added country search to the database.");
});

export { getNearbyCities, getCountryData };
