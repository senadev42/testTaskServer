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
  },
  {
    timestamps: true,
  }
);

const CountrySearch = mongoose.model("CountrySearch", countrySearchSchema);

export default CountrySearch;
