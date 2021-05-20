"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreditorRoutes = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _passport = _interopRequireDefault(require("passport"));

var _CreditorModel = require("../models/CreditorModel");

var _company_auth = require("../auth/company_auth");

var _Creditor = require("../Creditors/Creditor");

var _creditor_validation = require("../validators/creditor_validation");

var _helper = require("../helpers/helper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var isUser = _company_auth.companyAuth.isUser,
    isAdmin = _company_auth.companyAuth.isAdmin;
var helper = new _helper.Helper();

var CreditorRoutes = /*#__PURE__*/function () {
  function CreditorRoutes(express) {
    _classCallCheck(this, CreditorRoutes);

    this.router = express.Router();
  } // add new creditor


  _createClass(CreditorRoutes, [{
    key: "addCreditor",
    value: function addCreditor() {
      return this.router.post('/add', _passport["default"].authenticate('jwt', {
        session: false
      }), isUser, /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
          var validationResult, error, value, creditor, response, success, _error, errorMessage;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return new _creditor_validation.CreditorValidator().validateCreditorInput(req.body);

                case 3:
                  validationResult = _context.sent;
                  error = validationResult.error, value = validationResult.value;

                  if (!error) {
                    _context.next = 9;
                    break;
                  }

                  return _context.abrupt("return", res.status(400).json({
                    success: false,
                    message: error.message
                  }));

                case 9:
                  value['submited'] = {
                    by: req.user._id,
                    date: Date.now()
                  };
                  creditor = new _Creditor.Creditor(value);
                  _context.next = 13;
                  return creditor.create();

                case 13:
                  response = _context.sent;
                  success = response.success, _error = response.error;

                  if (!success) {
                    _context.next = 19;
                    break;
                  }

                  return _context.abrupt("return", res.status(200).json({
                    success: true,
                    message: 'Creditor successfully added'
                  }));

                case 19:
                  errorMessage = helper.checkDuplicate(_error);
                  return _context.abrupt("return", res.status(500).json({
                    success: success,
                    errorMessage: errorMessage
                  }));

                case 21:
                  _context.next = 26;
                  break;

                case 23:
                  _context.prev = 23;
                  _context.t0 = _context["catch"](0);
                  return _context.abrupt("return", res.json({
                    success: false,
                    errorMessage: "Something went wrong on, please contact admin!"
                  }));

                case 26:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[0, 23]]);
        }));

        return function (_x, _x2, _x3) {
          return _ref.apply(this, arguments);
        };
      }());
    } // retrieve all creditors

  }, {
    key: "getCreditors",
    value: function getCreditors() {
      return this.router.get('/', /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
          var creditorModel, result;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  creditorModel = new _CreditorModel.CreditorModel(_mongoose["default"]);
                  _context2.prev = 1;
                  _context2.next = 4;
                  return creditorModel.retrieveCreditors();

                case 4:
                  result = _context2.sent;
                  return _context2.abrupt("return", res.status(200).json({
                    success: true,
                    result: result
                  }));

                case 8:
                  _context2.prev = 8;
                  _context2.t0 = _context2["catch"](1);
                  return _context2.abrupt("return", res.status(500).json({
                    success: false,
                    errorMessage: "Something went wrong on, please contact admin!"
                  }));

                case 11:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, null, [[1, 8]]);
        }));

        return function (_x4, _x5, _x6) {
          return _ref2.apply(this, arguments);
        };
      }());
    }
  }]);

  return CreditorRoutes;
}();

exports.CreditorRoutes = CreditorRoutes;