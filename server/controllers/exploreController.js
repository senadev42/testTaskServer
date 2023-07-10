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
 * @expects coords, _id
 * @returns cities: list of places nearby
 */
const getNearbyCities = asyncHandler(async (req, res) => {
  //why do we need _id exactly? to store user location?
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
 * @expects countryCode, query_user_id
 * @returns countryData: details about a country code
 */
const getCountryData = asyncHandler(async (req, res) => {
  console.log(`Get country data invoked by ${req.ip} `);

  //1. get data from request body
  const { countryCode, query_user_id } = req.body;

  console.log("\nRecieved:" + countryCode);
  console.log("From: " + query_user_id);

  //2. invoke geodb utility function
  let countryData = await getCountryDetails(countryCode);

  //To the Database
  console.log(
    `Adding ${countryCode} country search  by ${query_user_id} to the database ...`
  );
  let CountrySearchObject = {
    query_user_id: query_user_id,
    countryCode: countryData.data.code,
    countryName: countryData.data.name,
    countryCapital: countryData.data.capital,
    numRegions: countryData.data.numRegions,
    flagUri: countryData.data.flagImageUri,
    callingCode: countryData.data.callingCode,
  };
  console.log(CountrySearchObject);
  const countrySearch = await CountrySearch.create(CountrySearchObject);
  console.log("Added a country search to the database.");

  //4. return request data to user
  res.send(countryData);
});

export { getNearbyCities, getCountryData };
