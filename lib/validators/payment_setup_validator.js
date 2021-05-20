"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaymentSetupValidator = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PaymentSetupValidator = /*#__PURE__*/function () {
  function PaymentSetupValidator() {
    _classCallCheck(this, PaymentSetupValidator);
  }

  _createClass(PaymentSetupValidator, [{
    key: "validatePaymentSetup",
    value: function validatePaymentSetup(payment) {
      var schema = _joi["default"].object({
        frequency: _joi["default"].string().required().min(6).max(15).error(new Error('Frequency is required')),
        commission: _joi["default"].number().required().error(new Error('Commission value is required')),
        proposedEscallationValue: _joi["default"].number().required().error(new Error('Proposed escalation required')),
        type: _joi["default"].string().required().max(15).error(new Error('Payment type is required')),
        firstPaymentDueDate: _joi["default"].date().required().error(new Error('Payment due date is required')),
        firstPaymentDistributionDate: _joi["default"].date().required().error(new Error('Payment distribution date is required')),
        bankingDetails: _joi["default"].object({
          name: _joi["default"].string().required().max(100).error(new Error('Bank name is required')),
          branch: _joi["default"].string().required().max(50).error(new Error('Branch name is required')),
          branchCode: _joi["default"].string().required().max(15).error(new Error('Branch code is required')),
          accountNumber: _joi["default"].string().required().max(15).error(new Error('Account number is required')),
          accountType: _joi["default"].string().required().max(15).error(new Error('Account type is required')),
          installment: _joi["default"].number().required().max(10000).error(new Error('Installment amount is required'))
        })
      });

      return schema.validate(payment);
    }
  }]);

  return PaymentSetupValidator;
}();

exports.PaymentSetupValidator = PaymentSetupValidator;