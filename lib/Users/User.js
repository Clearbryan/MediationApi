"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _UserModel = require("../models/UserModel");

var _CompanyModel = require("../models/CompanyModel");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var companyModel = new _CompanyModel.CompanyModel(_mongoose["default"]).mongoose.models.Company;
var userModel = new _UserModel.UserModel(_mongoose["default"]).createUserSchema();

var User = /*#__PURE__*/function () {
  function User(details) {
    _classCallCheck(this, User);

    this.firstName = details.firstName;
    this.lastName = details.lastName;
    this.phone = details.phone;
    this.email = details.email;
    this.role = details.role;
    this.loginId = details.loginId;
    this.password = details.password;
    this.company = details.company;
  } // create new user


  _createClass(User, [{
    key: "create",
    value: function () {
      var _create = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(companyId) {
        var user, found, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return userModel(this);

              case 3:
                user = _context.sent;
                _context.next = 6;
                return companyModel.findByIdAndUpdate(companyId);

              case 6:
                found = _context.sent;
                _context.next = 9;
                return user.save();

              case 9:
                result = _context.sent;
                found.users.push(result._id);
                _context.next = 13;
                return found.save();

              case 13:
                return _context.abrupt("return", {
                  success: true,
                  result: result
                });

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](0);
                console.log(_context.t0);
                return _context.abrupt("return", {
                  success: false,
                  error: _context.t0
                });

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 16]]);
      }));

      function create(_x) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }]);

  return User;
}();

exports.User = User;