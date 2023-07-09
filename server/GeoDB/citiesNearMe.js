import "../env_config.js";
import axios from "axios";

//this is a function that will accept a coordinate in ISO6709 format
//and return a list of cities near that coordinate

const baseNextURL = "https://wft-geo-db.p.rapidapi.com";
const basegeoURL = "https://wft-geo-db.p.rapidapi.com/v1/geo/";
const baselocalURL = "https://wft-geo-db.p.rapidapi.com/v1/locale/";

export async function getCitiesNearMe(coords) {
  console.log("\nFunction invoked: Get cities near me called \n");

  const paramsOptions = {
    types: "CITY", //ADM2 | CITY | ISLAND
    distanceUnit: undefined, //MI/KM
    limit: 10,
    offset: 0,
    sort: undefined,
    minPopulation: undefined,
    maxPopulation: undefined,
  };

  console.log("Coords: " + coords);
  console.log("Params: " + JSON.stringify(paramsOptions) + "\n");

  // We ex

  const options = {
    method: "GET",
    url: basegeoURL + "locations/" + coords + "/nearbyCities",
    params: paramsOptions,
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
  };

  const Until = 10; // Set the maximum number of results to retrieve
  let results = [];

  try {
    while (results.length < Until) {
      //1. Fire off requests
      const response = await axios.request({
        ...options,
        params: {
          ...options.params,
        },
      });

      console.log("Fetched " + response.data.data.length + " Countries");

      // 1.5 Add the results to the array
      results = results.concat(response.data.data);

      // Check if the maximum number of results has been reached
      if (results.length >= Until) {
        console.log("Maximum number of results reached");
        break;
      }

      //if not
      const nextLink =
        response.data.links &&
        response.data.links.find((link) => link.rel == "next");

      if (!nextLink) {
        break;
      }

      const fullNextLink = baseNextURL + nextLink.href || null;

      paramsOptions.offset += paramsOptions.limit;
      options.url = fullNextLink;

      await new Promise((resolve) => setTimeout(resolve, 800));
    }
  } catch (error) {
    console.error(error);
  }

  let sanitizedResults = results.map((city) => ({
    cityname: city.name,
    countryCode: city.countryCode,
    region: city.region,
    population: city.population,
    distance: city.distance,
  }));

  return sanitizedResults;
}

// const testcoord = "+19.022700+38.746800";
// console.log(await getCitiesNearMe(testcoord));
