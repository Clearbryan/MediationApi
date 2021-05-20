"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreditorValidator = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CreditorValidator = /*#__PURE__*/function () {
  function CreditorValidator() {
    _classCallCheck(this, CreditorValidator);
  }

  _createClass(CreditorValidator, [{
    key: "validateCreditorInput",
    value: function validateCreditorInput(creditor) {
      var schema = _joi["default"].object({
        name: _joi["default"].string().required().min(3).max(30).error(new Error("Creditor name is required")),
        type: _joi["default"].string().required().min(3).max(25).error(new Error("Type is required")),
        ncrNumber: _joi["default"].string().required().min(4).max(15).error(new Error("Ncr Number is required")),
        description: _joi["default"].string().max(250).error(new Error("250 characters allowed")),
        contact: _joi["default"].object({
          phone: _joi["default"].array().items(_joi["default"].object({
            type: _joi["default"].string(),
            number: _joi["default"].number()
          })),
          email: _joi["default"].array().items(_joi["default"].object({
            type: _joi["default"].string(),
            address: _joi["default"].string().email({
              minDomainSegments: 2
            }).required().max(50).error(new Error("Invalid or missing email address"))
          }))
        }),
        banking: _joi["default"].object({
          bankName: _joi["default"].string().required().min(3).max(30).error(new Error("Bank name is required")),
          accountNumber: _joi["default"].string().max(15).error(new Error("Invalid account number")),
          accountType: _joi["default"].string().valid('cheque', 'savings'),
          branchName: _joi["default"].string().max(25).required().error(new Error("Branch name is required")),
          branchCode: _joi["default"].string().required().min(4).max(10).error(new Error("Branch code is required"))
        }),
        address: _joi["default"].object({
          street: _joi["default"].string().required().max(500).error(new Error("Street address is required")),
          city: _joi["default"].string().required().max(25).error(new Error("City is required")),
          province: _joi["default"].string().required().valid('Western Cape', 'Gauteng', 'KwaZulu Natal', 'North West').error(new Error("Province is required")),
          postalCode: _joi["default"].string().min(4).max(4).required().error(new Error("Postal code is required")),
          country: _joi["default"].string().required().valid('South Africa').error(new Error("Invalid or unsupported country"))
        })
      });

      return schema.validate(creditor);
    }
  }]);

  return CreditorValidator;
}();

exports.CreditorValidator = CreditorValidator;