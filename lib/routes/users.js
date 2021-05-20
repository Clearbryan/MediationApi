"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserRoutes = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _lodash = _interopRequireDefault(require("lodash"));

var _UserModel = require("../models/UserModel");

var _Company = require("../Company/Company");

var _User = require("../Users/User");

var _helper = require("../helpers/helper");

var _CompanyModel = require("../models/CompanyModel");

var _company_validation = require("../validators/company_validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var companyModel = new _CompanyModel.CompanyModel(_mongoose["default"]).mongoose.models.Company;
var userModel = new _UserModel.UserModel(_mongoose["default"]).mongoose.models.User;
var companyValidator = new _company_validation.CompanyValidator();
var helper = new _helper.Helper();

var UserRoutes = /*#__PURE__*/function () {
  function UserRoutes(express) {
    _classCallCheck(this, UserRoutes);

    this.router = express.Router();
  } // signup new user


  _createClass(UserRoutes, [{
    key: "register",
    value: function register() {
      return this.router.post('/register', /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
          var userValidationResult, value, error, companyValidationResult, company, newCompany, success, _id, hash, user, newUser, createdUser, errorMessage, _errorMessage;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return companyValidator.validateCompanyUserDetails(req.body.userDetails);

                case 3:
                  userValidationResult = _context.sent;
                  value = userValidationResult.value, error = userValidationResult.error;

                  if (!error) {
                    _context.next = 9;
                    break;
                  }

                  return _context.abrupt("return", res.status(400).json({
                    success: false,
                    errorMessage: error.message
                  }));

                case 9:
                  _context.next = 11;
                  return companyValidator.validateCompanyGeneralDetails(req.body.companyDetails);

                case 11:
                  companyValidationResult = _context.sent;

                  if (!companyValidationResult.error) {
                    _context.next = 16;
                    break;
                  }

                  return _context.abrupt("return", res.status(400).json({
                    success: false,
                    errorMessage: error.message
                  }));

                case 16:
                  // create new company
                  company = new _Company.Company(companyValidationResult.value);
                  _context.next = 19;
                  return company.create();

                case 19:
                  newCompany = _context.sent;
                  success = newCompany.success;

                  if (!success) {
                    _context.next = 41;
                    break;
                  }

                  // company created ? save user
                  _id = newCompany.result._id;
                  _context.next = 25;
                  return helper.runEncryption(value.password);

                case 25:
                  hash = _context.sent;
                  user = _objectSpread(_objectSpread({}, value), {}, {
                    password: hash,
                    company: _id
                  });
                  newUser = new _User.User(user);
                  _context.next = 30;
                  return newUser.create(_id);

                case 30:
                  createdUser = _context.sent;

                  if (!createdUser.success) {
                    _context.next = 35;
                    break;
                  }

                  return _context.abrupt("return", res.status(200).json({
                    success: true,
                    message: 'Account created successfully'
                  }));

                case 35:
                  _context.next = 37;
                  return companyModel.findByIdAndRemove(_id);

                case 37:
                  errorMessage = helper.checkDuplicate(createdUser.error);
                  return _context.abrupt("return", res.status(400).json({
                    success: success,
                    errorMessage: errorMessage
                  }));

                case 39:
                  _context.next = 43;
                  break;

                case 41:
                  _errorMessage = helper.checkDuplicate(newCompany.error);
                  return _context.abrupt("return", res.status(400).json({
                    success: success,
                    errorMessage: _errorMessage
                  }));

                case 43:
                  _context.next = 48;
                  break;

                case 45:
                  _context.prev = 45;
                  _context.t0 = _context["catch"](0);
                  return _context.abrupt("return", res.status(500).json({
                    success: false,
                    errorMessage: _context.t0.message
                  }));

                case 48:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[0, 45]]);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    } // user login

  }, {
    key: "login",
    value: function login() {
      return this.router.post('/login', /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
          var _req$body, loginId, password, currentUser, isMatch, logedInUser, token;

          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _req$body = req.body, loginId = _req$body.loginId, password = _req$body.password;
                  _context2.prev = 1;
                  _context2.next = 4;
                  return userModel.findOne({
                    'loginId': loginId
                  });

                case 4:
                  currentUser = _context2.sent;

                  if (currentUser) {
                    _context2.next = 9;
                    break;
                  }

                  return _context2.abrupt("return", res.status(404).json({
                    success: false,
                    errorMessage: 'Login Id not found'
                  }));

                case 9:
                  _context2.next = 11;
                  return helper.compareEncryption(password, currentUser.password);

                case 11:
                  isMatch = _context2.sent;

                  if (isMatch) {
                    _context2.next = 16;
                    break;
                  }

                  return _context2.abrupt("return", res.status(400).json({
                    success: false,
                    errorMessage: 'Incorrect password'
                  }));

                case 16:
                  // generate token
                  logedInUser = _lodash["default"].pick(currentUser, ['_id', 'loginId', 'company', 'role']);
                  _context2.next = 19;
                  return helper.generateToken(logedInUser);

                case 19:
                  token = _context2.sent;
                  return _context2.abrupt("return", res.status(200).json({
                    success: true,
                    token: token
                  }));

                case 21:
                  _context2.next = 26;
                  break;

                case 23:
                  _context2.prev = 23;
                  _context2.t0 = _context2["catch"](1);
                  return _context2.abrupt("return", res.status(500).json({
                    success: false,
                    errorMessage: "Something went wrong on, please contact admin!"
                  }));

                case 26:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, null, [[1, 23]]);
        }));

        return function (_x3, _x4, _x5) {
          return _ref2.apply(this, arguments);
        };
      }());
    }
  }]);

  return UserRoutes;
}();

exports.UserRoutes = UserRoutes;