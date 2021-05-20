"use strict";

var _passportJwt = require("passport-jwt");

module.exports = function (passport, User) {
  var opts = {
    jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.APP_SECRET
  };
  passport.use(new _passportJwt.Strategy(opts, function (jwt_payload, done) {
    User.findOne({
      _id: jwt_payload._id
    }, function (err, user) {
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
};