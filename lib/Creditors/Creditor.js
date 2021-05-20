"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Creditor = void 0;

var _Entity = require("../models/Entity");

var _CreditorModel = require("../models/CreditorModel");

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var creditorModel = new _CreditorModel.CreditorModel(_mongoose["default"]).createCreditorSchema();

var Creditor = /*#__PURE__*/function () {
  function Creditor(details) {
    _classCallCheck(this, Creditor);

    this.name = details.name;
    this.description = details.description;
    this.ncrNumber = details.ncrNumber;
    this.type = details.type; // single / group

    this.address = details.address;
    this.contact = details.contact;
    this.banking = details.banking;
    this.submited = details.submited;
  } // create new creditor


  _createClass(Creditor, [{
    key: "create",
    value: function () {
      var _create = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var creditor, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                creditor = creditorModel(this);
                _context.next = 4;
                return creditor.save();

              case 4:
                result = _context.sent;
                return _context.abrupt("return", {
                  success: true,
                  result: result
                });

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", {
                  success: false,
                  error: _context.t0
                });

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8]]);
      }));

      function create() {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }]);

  return Creditor;
}();

exports.Creditor = Creditor;