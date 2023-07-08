import "./env_config.js";
import axios from "axios";

const baseNextURL = "https://wft-geo-db.p.rapidapi.com";

const basegeoURL = "https://wft-geo-db.p.rapidapi.com/v1/geo/";
const baselocalURL = "https://wft-geo-db.p.rapidapi.com/v1/locale/";

const paramsOptions = {
  currencyCode: undefined,
  namePrefix: undefined,
  namePrefixDefaultLangResults: undefined,
  limit: 10,
  offset: 0,
  sort: undefined,
};

const options = {
  method: "GET",
  url: basegeoURL + "countries",
  params: paramsOptions,
  headers: {
    "X-RapidAPI-Key": process.env.RAPID_API_KEY,
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

const Until = 190; // Set the maximum number of results to retrieve
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

    const fullNextLink = baseNextURL + nextLink.href || null;

    // console.log(nextLink.href);
    // console.log(fullNextLink);
    if (!nextLink) {
      break;
    }

    paramsOptions.offset += paramsOptions.limit;
    options.url = fullNextLink;

    await new Promise((resolve) => setTimeout(resolve, 800));
  }
} catch (error) {
  console.error(error);
}

results.forEach((country) => console.log(country.name));
