const express = require("express");
const router = express.Router();
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const passport = require('passport');

router.post("/register", (request, response, next) => {
    let newUser = new User({
      name: request.body.name,
      email: request.body.email,
      username: request.body.username,
      password: request.body.password
    });

    User.addUser(newUser, (err, user) => {
      if (err) {
        console.error(err);
        response.json({
          success: false,
          msg: "Failed to register user"
        });
      } else {
        response.json({
          success: true,
          msg: "User registered."
        });
      }
    });
});

router.post("/authenticate", (request, response, next) => {
  const username = request.body.username;
  const password = request.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;

    if (!user) {
      return response.json({success: false, msg: "User not found"});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;

      if (!isMatch) {
        return response.json({success: false, msg: "Incorrect Password"});
      }

      const token = jwt.sign({data: user}, config.secret, {
        expiresIn: 86400 // day
      });

      response.json({
        success: true,
        token: 'JWT ' + token,
        user: {
          id: user._id,
          name: user.name,
          username: user.username,
          email: user.email
        }
      });
    });
  })
});

router.get("/profile", passport.authenticate('jwt', {session: false}), (request, response, next) => {
  response.json({user: request.user});
});

router.get("/validate", (request, response, next) => {
    response.send("VALIDATE");
});

module.exports = router;
