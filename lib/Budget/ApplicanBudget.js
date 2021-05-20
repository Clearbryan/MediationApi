"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Budget = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _BudgetModel = require("../models/BudgetModel");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var budgetModel = new _BudgetModel.BudgetModel(_mongoose["default"]).createBudgetSchema();

var Budget = /*#__PURE__*/function () {
  function Budget(details) {
    _classCallCheck(this, Budget);

    this.income = details.income;
    this.deductions = details.deductions;
    this.expenses = details.expenses;
    this.netIncome = details.netIncome;
    this.totalAvaillableForDistribution = details.totalAvaillableForDistribution, this.fees = details.fees;
    this.applicant = details.applicant;
    this.grossIncome = details.grossIncome;
    this.totalExpense = details.totalExpense;
    this.totalDeductions = details.totalDeductions;
    this.recurringFee = details.recurringFee;
    this.netAvaillableForDistribution = details.netAvaillableForDistribution;
  } // create new budget setup


  _createClass(Budget, [{
    key: "create",
    value: function () {
      var _create = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
        var applicantBudget, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                applicantBudget = budgetModel(this);
                _context.next = 4;
                return applicantBudget.save();

              case 4:
                result = _context.sent;
                return _context.abrupt("return", {
                  success: true,
                  result: result
                });

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                console.log(_context.t0);
                return _context.abrupt("return", {
                  success: false,
                  error: _context.t0
                });

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8]]);
      }));

      function create(_x) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }]);

  return Budget;
}();

exports.Budget = Budget;