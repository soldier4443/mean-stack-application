const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../model/user');
const config = require('./database');

module.exports = function (passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = config.secret;

  passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    User.getUserById(jwtPayload.data._id, (err, user) => {
      if (err) {
        return done(err, false);
      }

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));
}
