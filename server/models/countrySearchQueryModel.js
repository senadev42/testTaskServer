import mongoose from "mongoose";

const countrySearchSchema = mongoose.Schema(
  {
    query_user_id: {
      type: String,
      required: true,
    },
    countryCode: {
      type: String,
      required: true,
    },
    countryName: {
      type: String,
      required: true,
    },
    countryCapital: {
      type: String,
      required: true,
    },
    numRegions: {
      type: Number,
      required: true,
    },
    flagUri: {
      type: String,
      required: true,
    },
    callingCode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CountrySearch = mongoose.model("CountrySearch", countrySearchSchema);

export default CountrySearch;
