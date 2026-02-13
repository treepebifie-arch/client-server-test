# Primetrade.ai test

## description
This is a project that performs basic authentication and authorization, Role based access functions. It also have a secondary note entity where users are able to create, read, update and delete their notes, lock sensitive notes with password and pin important notes for easier access. It follows MVC architure for clarity, scalability and easier debugging.

## Technologies Used
Node.js: Runtime environment 

Express.js.: Nodejs framework

MongoDB: non-relational Database

Mongoose: ODM for MongoDB

Morgan: middleware for easier debugging

Bcryptjs: for password hashing

Jsonwebtoken: authorization/generating token

joi: for validation

and several other librabries such as cors, helmet, body-parser, express-rate-limit etc

## Folder Structure
The folder structure is based on the MVC architecture, which helps to keep the code organized, and to make debugging easier.The root directory, src, contains other directories such as controllers, models, routes and config


```text

├── .gitignore       // Specifies files/folders Git should ignore.
├── package.json     // contains all dependencies used in this project.
├── server.js        // The main entry point and Express application setup.
├── app.js           // contains all middlewares
├── README.md        // Brief description of the project and how to run it.
└──src 
    ├── models/         // Database Schemas
    ├── routes/         // Defines all route endpoints for users and notes.
    ├── config/         // Database connection.
    ├── middleware      // contains authorization, errorhandler, responsehander and validation middlewares.
    ├── services        // contains all business logic 
    ├── utils           // holds apperror file
    └── controllers/    // endpoint controllers

```

## How to run Locally 
* Clone this Repository
* Install all Dependencies listed in the package.json file
* Create the required .env file that will contain all environment variables and sensitive keys.

* Start the Server using 'node server.js' or 'npm run dev' after installing nodemon as a devDependency for nodemon to automatically run the server. 

The server will run on http://localhost: (the port specified in your .env).

* You can now test the endpoints using thunder client or postman,  interacting with the database via the /api/v1/user  for user routes and /api/v1/note for note routes.