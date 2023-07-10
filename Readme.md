# Test Task Server

This is the server-side of a full-stack web application that allows users to register, log in, and search for cities using the GeoDB Cities API. The backend of the application was built using Node.js and Express.js, and interacts with the frontend client using Axios HTTP client. It uses a MongoDB database for data storage.

## Folder Structure

The project has the following folder structure:

```
├── GeoDB
│   ├── citiesNearMe.js
│   └── countryData.js
├── config
│   ├── config.js
│   └── db.js
├── controllers
│   ├── exploreController.js
│   └── userController.js
├── env_config.js
├── geodb.js
├── middleware
│   ├── authMiddleware.js
│   └── errorMiddleware.js
├── models
│   ├── countrySearchQueryModel.js
│   └── userModel.js
├── public
│   └── index.html
├── routes
│   ├── exploreRoutes.js
│   └── userRoutes.js
└── server.js
```

- `GeoDB`: Contains scripts that interact with the GeoDB Cities API.
- `config`: Contains configuration files for the application.
- `controllers`: Contains the controller functions for handling HTTP requests.
- `env_config.js`: Contains the environment variables for the application.
- `geodb.js`: Initializes the GeoDB Cities API client.
- `middleware`: Contains middleware functions for the application.
- `models`: Contains the database schema models for the application.
- `public`: Contains the public files for the application.
- `routes`: Contains the route handlers for the application.
- `server.js`: Initializes the Express.js server.

## Installation

To run the application on your machine, you need to have Node.js and MongoDB installed. Then, follow these steps:

1. Clone the repository to your local machine using the command:

   ````
   git clone https://github.com/senadev42/testTaskServer.git
   ```

   ````

2. Navigate to the project directory using:

   ```
   cd testTaskServer
   ```

3. Install the dependencies using the command:

   ```
   npm install
   ```

4. Create an `.env` file in the root of the project and add the following environment variables:

   ```
   NODE_ENV=development
   PORT=<port_number>
   MONGO_URI=<mongo_uri>
   JWT_SECRET=<jwt_secret>
   RAPID_API_KEY=<rapid_api_key>
   ```

5. Start the development server using the command:

   ```
   npm run server
   ```

   This will run the application on `http://localhost:<port_number>`.

## Technologies and Libraries Used

The application was built with the following technologies and libraries:

- Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- Express.js: A fast and minimalist web framework for Node.js.
- MongoDB: A NoSQL document-oriented database.
- Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js.
- Axios: A Promise based HTTP client for the browser and Node.js.
- bcryptjs: A library for hashing passwords.
- cookie-parser: A middleware for parsing cookies in HTTP requests.
- cors: A middleware for enabling CORS (Cross-Origin Resource Sharing) in Express.js.
- jsonwebtoken: A library for generating and verifying JSON Web Tokens (JWT).
- dotenv: A zero-dependency module for loading environment variables from a `.env` file.

## API Endpoints

The Test Task API includes the following endpoints:

- `POST /api/users/register`: Registers a new user.
- `POST /api/users/login`: Logs in a user.
- `GET /api/users/profile`: Gets the user profile.
- `PUT /api/users/profile`: Updates the user profile.
- `POST /api/explore/search`: Searches for cities using the GeoDB Cities API.

## Authentication

The Test Task API uses JWT (JSON Web Token) for user authentication. When a user logs in, a JWT token is generated and sent back to the client, which is then stored in the browser's local storage. This token is then included in the header of every subsequent request to the API that requires authentication.

Initially, cookies were used for carrying the JWT however due to hosting limitation introducing issues resolving third party cookie resolution, the authentication was refactored.

## Credits

This project was created by [Meheret Samuel](https://github.com/senadev42) as part of a test task.
