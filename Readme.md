# Test Task Server

This is the server-side of a full-stack web application that allows users to register, log in, and search for cities using the GeoDB Cities API. The backend of the application was built using Node.js and Express.js, and interacts with the frontend client using Axios HTTP client. It uses a MongoDB database for data storage.

It's client is found hosted at https://github.com/senadev42/testTaskClient and running at http://test-task-client-tau.vercel.app/

Note: The server for this site is hosted on testtask-server.onrender.com which goes dormant after more than 15 minutes of activity so the first request will take a while as the web server spins up. Check to see if the server is running by going to testtask-server.onrender.com before testing the client.


## Development Approach
1. I approached this task starting with the server, setting up authentication endpoints as well with express, the database schema and models with Mongoose.
2. After that I then imlementing the pages for login, registration and logging out using redux to both accept and save incoming data and to make the api calls with apislices. 
3. And then I implemented the other necessary pages on the front end so I could visualize what data they needed from the GeoDB API and in what format the needed to recieve and how this data would be stored. I implemented it in the following order: NearMe (fetching static data), Search (fetching dynamic data) and History (retrieving data).
4. Then I moved on to the backend end and implementing the routes to return the data and the utility functions to fetch this data from the GeoDB API.
5. After this I went back to the frontend to implement sanitization and error handling and testing for edge cases.
6. I initially implemented authentication with cookies, however upon moving to the deployment stage, I discovered that the hosted front end was not recieving cookies from the server which in turn made it impossibly to interact with the protected APIs. I discovered that this was likely caused by the hosting solution I used where the server and client were on different domains and origins. I rewrote the authentication to use local storage after that and deployed again.


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
- `routes`: Contains the route handlers for the application.
- `server.js`: Initializes the Express.js server.

## Installation

To run the application on your machine, you need to have Node.js and MongoDB installed (or you can use Atlas). 
Additionally, you will have to make a free account [here](https://rapidapi.com/wirefreethought/api/geodb-cities/) and get an api key.
Then, follow these steps:

1. Clone the repository to your local machine using the command:

   ````
   git clone https://github.com/senadev42/testTaskServer.git
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

Note: The client is configure to proxy to port 5000 by default, but this can be configured in the vite.config.ts file.

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

##### User Auth Endpoints
- POST /api/users/register: Registers a new user. This endpoint is not protected and can be accessed by anyone.
- POST /api/users/login: Logs in a user. This endpoint is not protected and can be accessed by anyone.
- GET /api/users/profile: Gets the user profile. This endpoint is protected and can only be accessed by authenticated users with a valid access token.
- PUT /api/users/profile: Updates the user profile. This endpoint is protected and can only be accessed by authenticated users with a valid access token.
- POST /api/users/logout: Logs out the user. This endpoint is protected and can only be accessed by authenticated users with a valid access token.

##### Explore Endpoints
- POST /api/explore/nearby-cities: Gets nearby cities using the GeoDB Cities API. This endpoint is protected and can only be accessed by authenticated users with a valid access token.
- POST /api/explore/country-data: Gets country data using the GeoDB Cities API. This endpoint is protected and can only be accessed by authenticated users with a valid access token.
- POST /api/explore/country-history: Gets the user's country search history. This endpoint is protected and can only be accessed by authenticated users with a valid access token.
  

## Authentication

The Test Task API uses JWT (JSON Web Token) for user authentication. When a user logs in, a JWT token is generated and sent back to the client, which is then stored in the browser's local storage. This token is then included in the header of every subsequent request to the API that requires authentication.

_Note: Initially, cookies were used for carrying the JWT however due to hosting limitations introducing issues involving third party cookie resolution, the authentication was refactored to use local storage instead._

## Credits

This project was created by [Meheret Samuel](https://github.com/senadev42) as part of a test task.
