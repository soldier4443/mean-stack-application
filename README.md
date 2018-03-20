### Web application with MEAN Stack

Simple MEAN Stack web application based on [Tutorials on MEAN Stack from Traversy Meadia](https://www.youtube.com/watch?v=uONz0lEWft0&list=PLillGF-RfqbZMNtaOXJQiDebNXjVapWPZ).

I'm planning to use [Vue.js](https://vuejs.org/) for the front-end framework instead of Angular..

### Usage

#### Start the Database

    ./mongod

The data will be stored in /data.

#### Start the server

    npm install
    npm start
    
For or auto-restart when the code changes:

    nodemon

### Endpoints

    POST /users/register
    POST /users/authenticate
    GET /users/profile  // jwt needed.

The server uses [JWT(JSON Web Token)](https://jwt.io/) to authenticate the user.
the notation "jwt needed." means when you send a request, you should include "Authentication" Header with JSON Web Token.
