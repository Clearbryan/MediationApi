"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminRoutes = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _passport = _interopRequireDefault(require("passport"));

var _lodash = _interopRequireDefault(require("lodash"));

var _helper = require("../helpers/helper");

var _admin_validator = require("../validators/admin_validator");

var _Admin = require("../models/Admin");

var _CreditorModel = require("../models/CreditorModel");

var _CompanyModel = require("../models/CompanyModel");

var _Admin2 = require("../Admin/Admin");

var _admin_auth = require("../auth/admin_auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var adminValidator = new _admin_validator.AdminValidator();
var adminModel = new _Admin.AdminModel(_mongoose["default"]).mongoose.models.Admin;
var companyModel = new _CompanyModel.CompanyModel(_mongoose["default"]).mongoose.models.Company;
var creditorModel = new _CreditorModel.CreditorModel(_mongoose["default"]).mongoose.models.Creditor;
var helper = new _helper.Helper();
var isSuperUser = _admin_auth.adminAuth.isSuperUser;

var AdminRoutes = /*#__PURE__*/function () {
  function AdminRoutes(express) {
    _classCallCheck(this, AdminRoutes);

    this.router = express.Router();
  }

  _createClass(AdminRoutes, [{
    key: "addSuperAdminUser",
    value: function addSuperAdminUser() {
      return this.router.post('/add', isSuperUser, /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
          var validationResult, error, value, hash, newAdminUser, admin, result, errorMessage;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return adminValidator.validateAdminDetails(req.body);

                case 2:
                  validationResult = _context.sent;
                  error = validationResult.error, value = validationResult.value;

                  if (!error) {
                    _context.next = 8;
                    break;
                  }

                  return _context.abrupt("return", res.status(400).json({
                    success: false,
                    errorMessage: error.message
                  }));

                case 8:
                  _context.next = 10;
                  return helper.runEncryption(value.password);

                case 10:
                  hash = _context.sent;
                  newAdminUser = _objectSpread(_objectSpread({}, value), {}, {
                    password: hash
                  }); // attempt to save to database

                  admin = new _Admin2.Admin(newAdminUser);
                  _context.next = 15;
                  return admin.create();

                case 15:
                  result = _context.sent;

                  if (result.success) {
                    _context.next = 23;
                    break;
                  }

                  _context.next = 19;
                  return helper.checkDuplicate(result.error);

                case 19:
                  errorMessage = _context.sent;
                  return _context.abrupt("return", res.status(400).json({
                    success: false,
                    errorMessage: errorMessage
                  }));

                case 23:
                  return _context.abrupt("return", res.status(200).json({
                    success: true,
                    message: 'Adin user added successfully'
                  }));

                case 24:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    } // super admin login

  }, {
    key: "superAdminLogin",
    value: function superAdminLogin() {
      return this.router.post('/login', /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
          var _req$body, loginId, password, user, isMatch, token;

          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _req$body = req.body, loginId = _req$body.loginId, password = _req$body.password;
                  _context2.prev = 1;
                  _context2.next = 4;
                  return adminModel.findOne({
                    loginId: loginId
                  });

                case 4:
                  user = _context2.sent;

                  if (user) {
                    _context2.next = 9;
                    break;
                  }

                  return _context2.abrupt("return", res.status(404).json({
                    success: false,
                    errorMessage: 'Login Id not found'
                  }));

                case 9:
                  _context2.next = 11;
                  return helper.compareEncryption(password, user.password);

                case 11:
                  isMatch = _context2.sent;

                  if (isMatch) {
                    _context2.next = 16;
                    break;
                  }

                  return _context2.abrupt("return", res.status(404).json({
                    success: false,
                    errorMessage: 'Incorrect password'
                  }));

                case 16:
                  _context2.next = 18;
                  return helper.generateToken(_lodash["default"].pick(user, ['loginId', 'email', 'accessLevel']));

                case 18:
                  token = _context2.sent;
                  res.status(200).json({
                    success: true,
                    token: token
                  });

                case 20:
                  _context2.next = 25;
                  break;

                case 22:
                  _context2.prev = 22;
                  _context2.t0 = _context2["catch"](1);
                  return _context2.abrupt("return", res.json({
                    success: false,
                    errorMessage: _context2.t0.message
                  }));

                case 25:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, null, [[1, 22]]);
        }));

        return function (_x3, _x4) {
          return _ref2.apply(this, arguments);
        };
      }());
    } // get all creditors

  }, {
    key: "getCreditors",
    value: function getCreditors() {
      return this.router.get('/creditors', isSuperUser, /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
          var creditors;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.prev = 0;
                  _context3.next = 3;
                  return creditorModel.find();

                case 3:
                  creditors = _context3.sent;
                  res.status(200).json({
                    success: true,
                    creditors: creditors
                  });
                  _context3.next = 10;
                  break;

                case 7:
                  _context3.prev = 7;
                  _context3.t0 = _context3["catch"](0);
                  return _context3.abrupt("return", res.json({
                    success: false,
                    errorMessage: _context3.t0.message
                  }));

                case 10:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, null, [[0, 7]]);
        }));

        return function (_x5, _x6) {
          return _ref3.apply(this, arguments);
        };
      }());
    } // get all companies

  }, {
    key: "getCompanies",
    value: function getCompanies() {
      return this.router.get('/companies', isSuperUser, /*#__PURE__*/function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
          var companies;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.prev = 0;
                  _context4.next = 3;
                  return companyModel.find();

                case 3:
                  companies = _context4.sent;
                  res.status(200).json({
                    success: true,
                    companies: companies
                  });
                  _context4.next = 10;
                  break;

                case 7:
                  _context4.prev = 7;
                  _context4.t0 = _context4["catch"](0);
                  return _context4.abrupt("return", res.json({
                    success: false,
                    errorMessage: _context4.t0.message
                  }));

                case 10:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, null, [[0, 7]]);
        }));

        return function (_x7, _x8) {
          return _ref4.apply(this, arguments);
        };
      }());
    }
  }]);

  return AdminRoutes;
}();

exports.AdminRoutes = AdminRoutes;