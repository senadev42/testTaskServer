import { config } from "dotenv";
import connectToMDB from "./db.js";

config();
connectToMDB();

console.log(`Running in ${process.env.NODE_ENV} mode`);
