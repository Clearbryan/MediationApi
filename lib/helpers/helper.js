"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Helper = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Helper = /*#__PURE__*/function () {
  function Helper() {
    _classCallCheck(this, Helper);

    _defineProperty(this, "checkDuplicate", function (error) {
      var message;

      if (error.code === 11000) {
        var entries = Object.entries(error.keyValue);
        message = "Duplicate entry! ".concat(entries[0][0], ": ").concat(entries[0][1], " already exists.");
      } else {
        message = "Something went wrong, please try again or contact admin.";
      }

      return message;
    });

    _defineProperty(this, "runEncryption", /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
        var salt, hash;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _bcrypt["default"].genSalt(10);

              case 3:
                salt = _context.sent;
                _context.next = 6;
                return _bcrypt["default"].hash(data, salt);

              case 6:
                hash = _context.sent;
                return _context.abrupt("return", hash);

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", _context.t0);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 10]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(this, "compareEncryption", /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(data, hash) {
        var isMatch;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _bcrypt["default"].compare(data, hash);

              case 3:
                isMatch = _context2.sent;
                return _context2.abrupt("return", isMatch);

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", _context2.t0);

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 7]]);
      }));

      return function (_x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    }());

    _defineProperty(this, "generateToken", /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(data) {
        var token;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _jsonwebtoken["default"].sign(data, process.env.APP_SECRET);

              case 3:
                token = _context3.sent;
                return _context3.abrupt("return", token);

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", _context3.t0);

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 7]]);
      }));

      return function (_x4) {
        return _ref3.apply(this, arguments);
      };
    }());
  }

  _createClass(Helper, [{
    key: "generateRefNumber",
    value: // generate random number
    function generateRefNumber() {
      return Math.floor(Math.random() * 9000000000) + 1000000000;
    } // calculate total expense

  }, {
    key: "calculateTotalExpense",
    value: function calculateTotalExpense(expense) {
      var total = 0;
      expense.forEach(function (el) {
        total += el.amount;
      });
      return total;
    } // calculate total deductions

  }, {
    key: "calculateTotalDeductions",
    value: function calculateTotalDeductions(deductions) {
      var total = 0;
      deductions.forEach(function (el) {
        total += el.amount;
      });
      return total;
    } // calculate net Income

  }, {
    key: "calculateNetIncome",
    value: function calculateNetIncome(gross, deductions) {
      return Number(gross - deductions);
    } // calculate recurring fee

  }, {
    key: "calculateRecuringFee",
    value: function calculateRecuringFee(amount) {
      return Number(5 / 100 * amount).toFixed(0);
    } // calculate total available for distribution

  }, {
    key: "calculateTotalAvailForDist",
    value: function calculateTotalAvailForDist(net, expenses) {
      return Number(net - expenses);
    } // calculate net available for distribution

  }, {
    key: "calculateNetAvailForDist",
    value: function calculateNetAvailForDist(totalAvailForDis, recrringFee) {
      return Number(totalAvailForDis - recrringFee);
    } // calculate gross income

  }, {
    key: "calculateGrossIncome",
    value: function calculateGrossIncome(income) {
      var total = 0;
      income.forEach(function (el) {
        total += el.amount;
      });
      return total;
    } // validate object id

  }, {
    key: "validateObjectId",
    value: function validateObjectId(id) {
      var ObjectId = _mongoose["default"].Types.ObjectId;
      return ObjectId.isValid(id);
    } // check duplicate entries

  }]);

  return Helper;
}();

exports.Helper = Helper;