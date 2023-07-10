import "./config/config.js";
import express from "express";
import cookieParser from "cookie-parser";
import path from "path";

import cors from "cors";

//Importing Routes
import userRoutes from "./routes/userRoutes.js";
import exploreRoutes from "./routes/exploreRoutes.js";

//Importing Middleware
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

//setting up the express app
const app = express();
const port = process.env.PORT || 5000;
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// app.use(
//   cors({
//     origin: "testtask-client.onrender.com",
//     credentials: true,
//   })
// );

// Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Binding Endpoints to Routes
app.use("/api/users", userRoutes);
app.use("/api/explore", exploreRoutes);

//home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

//listening to the port
app.listen(port, () => console.log(`Server started on port ${port}`));
