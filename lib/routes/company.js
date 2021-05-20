"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompanyRoutes = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _passport = _interopRequireDefault(require("passport"));

var _company_validation = require("../validators/company_validation");

var _helper = require("../helpers/helper");

var _company_auth = require("../auth/company_auth");

var _User = require("../Users/User");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var helper = new _helper.Helper();
var companyValidator = new _company_validation.CompanyValidator();
var isUser = _company_auth.companyAuth.isUser,
    isAdmin = _company_auth.companyAuth.isAdmin;

var CompanyRoutes = /*#__PURE__*/function () {
  function CompanyRoutes(express) {
    _classCallCheck(this, CompanyRoutes);

    this.router = express.Router();
  } // add company user
  // @ ROUTE - POST (Protected route - Company Admin Only)


  _createClass(CompanyRoutes, [{
    key: "addCompanyUser",
    value: function addCompanyUser() {
      return this.router.post('/add/users', _passport["default"].authenticate('jwt', {
        session: false
      }), isAdmin, /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
          var validationResult, error, value, hash, user, newUser, createdUser, errorMessage;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return companyValidator.validateCompanyUserDetails(req.body.users);

                case 3:
                  validationResult = _context.sent;
                  error = validationResult.error, value = validationResult.value; // if validation fails

                  if (!error) {
                    _context.next = 9;
                    break;
                  }

                  return _context.abrupt("return", res.status(400).json({
                    success: false,
                    message: error.message
                  }));

                case 9:
                  _context.next = 11;
                  return helper.runEncryption(value.password);

                case 11:
                  hash = _context.sent;
                  user = _objectSpread(_objectSpread({}, value), {}, {
                    password: hash,
                    company: req.user.company
                  }); // create new user

                  newUser = new _User.User(user);
                  _context.next = 16;
                  return newUser.create(req.user.company);

                case 16:
                  createdUser = _context.sent;

                  if (createdUser.success) {
                    _context.next = 22;
                    break;
                  }

                  errorMessage = helper.checkDuplicate(createdUser.error);
                  return _context.abrupt("return", res.status(400).json({
                    success: false,
                    errorMessage: errorMessage
                  }));

                case 22:
                  res.status(200).json({
                    success: true,
                    message: 'User added successfully'
                  });

                case 23:
                  _context.next = 28;
                  break;

                case 25:
                  _context.prev = 25;
                  _context.t0 = _context["catch"](0);
                  return _context.abrupt("return", res.status(500).json({
                    success: false,
                    errorMessage: _context.t0.message
                  }));

                case 28:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[0, 25]]);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }]);

  return CompanyRoutes;
}();

exports.CompanyRoutes = CompanyRoutes;