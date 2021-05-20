"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BudgetValidator = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BudgetValidator = /*#__PURE__*/function () {
  function BudgetValidator() {
    _classCallCheck(this, BudgetValidator);
  }

  _createClass(BudgetValidator, [{
    key: "validateBudget",
    value: function validateBudget(budget) {
      var schema = _joi["default"].object({
        income: _joi["default"].array().items(_joi["default"].object({
          type: _joi["default"].string().max(25),
          amount: _joi["default"].number(),
          comment: _joi["default"].string().max(250)
        })),
        deductions: _joi["default"].array().items(_joi["default"].object({
          type: _joi["default"].string().max(25),
          amount: _joi["default"].number(),
          comment: _joi["default"].string().max(250)
        })),
        expenses: _joi["default"].array().items(_joi["default"].object({
          type: _joi["default"].string().max(25),
          amount: _joi["default"].number(),
          comment: _joi["default"].string().max(250)
        }))
      });

      return schema.validate(budget);
    }
  }]);

  return BudgetValidator;
}();

exports.BudgetValidator = BudgetValidator;