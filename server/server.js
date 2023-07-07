import "./config/config.js";
import express from "express";

//Routes
import userRoutes from "./routes/userRoutes.js";

//Middleware
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

//setting up the express app
const app = express();
const port = process.env.PORT || 5000;

//binding endpoints to routes
app.use("/api/users", userRoutes);

//error handling middleware
app.use(notFound);
app.use(errorHandler);

//home route
app.get("/", (req, res) => res.send("API running"));

//listening to the port
app.listen(port, () => console.log(`Server started on port ${port}`));
