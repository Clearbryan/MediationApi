"use strict";

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports.adminAuth = {
  isSuperUser: function isSuperUser(req, res, next) {
    var authorization = req.headers.authorization;
    var data = authorization.split(' ');

    _jsonwebtoken["default"].verify(data[1], process.env.APP_SECRET, function (err, user) {
      if (err) {
        return res.json({
          success: false,
          errorMessage: err.message
        });
      }

      if (user) {
        user.accessLevel === 4 ? next() : res.status(401).json({
          success: false,
          errorMessage: 'Unauthorized Resource'
        });
      } else {
        return res.status(401).json({
          success: false,
          errorMessage: 'Unauthorized Resource'
        });
      }
    });
  }
};