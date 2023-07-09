import "../env_config.js";
import axios from "axios";

//this is a function that will accept an ISO3166 country code
//and return details about the country

const basegeoURL = "https://wft-geo-db.p.rapidapi.com/v1/geo/";

export async function getCountryDetails(countryCode) {
  //local logging
  // console.log("\nFunction invoked: Get Country Details");
  // console.log("Making request to " + basegeoURL + "countries/" + countryCode);
  // console.log("Code: " + countryCode);

  const options = {
    method: "GET",
    url: basegeoURL + "countries/" + countryCode,
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
  };

  let results = [];
  try {
    //1. Fire off requests
    const response = await axios.request({
      ...options,
    });

    // 1.5 Add the results to the array

    results = response.data;
  } catch (error) {
    console.error(error.response.data);
  }

  return results;
}

// const testcoord = "UA";
// console.log(await getCountryDetails(testcoord));
