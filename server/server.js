import "./config/config.js";
import express from "express";

//Importing Routes
import userRoutes from "./routes/userRoutes.js";

//Importing Middleware
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

//setting up the express app
const app = express();
const port = process.env.PORT || 5000;

// Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Binding Endpoints to Routes
app.use("/api/users", userRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

//home route
app.get("/", (req, res) => res.send("API running"));

//listening to the port
app.listen(port, () => console.log(`Server started on port ${port}`));
