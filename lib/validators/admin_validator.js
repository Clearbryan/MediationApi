"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminValidator = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AdminValidator = /*#__PURE__*/function () {
  function AdminValidator() {
    _classCallCheck(this, AdminValidator);
  }

  _createClass(AdminValidator, [{
    key: "validateAdminDetails",
    value: function validateAdminDetails(admin) {
      var schema = _joi["default"].object({
        loginId: _joi["default"].string().required().min(4).max(15).error(new Error('Login Id is required')),
        email: _joi["default"].string().email({
          minDomainSegments: 2
        }).required().error(new Error('Invalid email address')),
        password: _joi["default"].string().required().min(6).max(15).error(new Error('Password is required (min length 6 characters)')),
        accessLevel: _joi["default"].number().max(4)
      });

      return schema.validate(admin);
    }
  }]);

  return AdminValidator;
}();

exports.AdminValidator = AdminValidator;