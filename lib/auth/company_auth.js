"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _CompanyModel = require("../models/CompanyModel");

var _UserModel = require("../models/UserModel");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userModel = new _UserModel.UserModel(_mongoose["default"]).mongoose.models;
var companyModel = new _CompanyModel.CompanyModel(_mongoose["default"]).mongoose.models.Company;
module.exports.companyAuth = {
  isUser: function isUser(req, res, next) {
    if (req.user.role === 'user' || req.user.role === 'admin') {
      next();
    } else {
      return res.status(401).json({
        success: false,
        errorMessage: 'Unauthorized resource'
      });
    }
  },
  isAdmin: function isAdmin(req, res, next) {
    req.user.role === 'admin' ? next() : res.status(401).json({
      success: false,
      errorMessage: 'Unauthorized resource'
    });
  }
};