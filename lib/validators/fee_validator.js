"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeeValidator = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FeeValidator = /*#__PURE__*/function () {
  function FeeValidator() {
    _classCallCheck(this, FeeValidator);
  }

  _createClass(FeeValidator, [{
    key: "validateFee",
    value: function validateFee(fee) {
      var schema = _joi["default"].object({
        type: _joi["default"].string().required().max(50).error(new Error('Fee type is required')),
        amount: _joi["default"].number().required().error(new Error('Amount is required')),
        balance: _joi["default"].number()
      });

      return schema.validate(fee);
    }
  }]);

  return FeeValidator;
}();

exports.FeeValidator = FeeValidator;