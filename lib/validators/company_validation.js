"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompanyValidator = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CompanyValidator = /*#__PURE__*/function () {
  function CompanyValidator() {
    _classCallCheck(this, CompanyValidator);
  }

  _createClass(CompanyValidator, [{
    key: "validateCompanyGeneralDetails",
    value: function validateCompanyGeneralDetails(company) {
      var schema = _joi["default"].object({
        details: _joi["default"].object({
          name: _joi["default"].string().required().min(3).max(25).error(new Error("Company name is required")),
          tradingName: _joi["default"].string().min(3).max(25).error(new Error("Invalid trading name")),
          registeredName: _joi["default"].string().min(3).max(25).error(new Error("Invalid registered name")),
          entityType: _joi["default"].string().min(3).max(25).error(new Error("Invalid entity type")),
          registrationNumber: _joi["default"].string().required().min(3).max(25).error(new Error("Invalid registration number")),
          vat: _joi["default"].object({
            registered: _joi["default"]["boolean"]().error(new Error("Invalid vat registration type")),
            number: _joi["default"].string().min(3).max(25).error(new Error("Invalid vat number"))
          })
        })
      });

      return schema.validate(company);
    }
  }, {
    key: "validateCompanyContactDetail",
    value: function validateCompanyContactDetail(details) {
      var schema = _joi["default"].object({
        name: _joi["default"].string().required().min(3).max(30).error(new Error("Name is required")),
        cell: _joi["default"].string().required().min(10).max(10).error(new Error("Cell number is required")),
        tel: _joi["default"].string().min(10).max(10).error(new Error("Invalid telephone number")),
        fax: _joi["default"].string().min(10).max(10).error(new Error("Invalid fax number")),
        email: _joi["default"].string().email({
          minDomainSegments: 2
        }).error(new Error("Invalid email address"))
      });

      return schema.validate(details);
    }
  }, {
    key: "validateCompanyUserDetails",
    value: function validateCompanyUserDetails(user) {
      var schema = _joi["default"].object({
        firstName: _joi["default"].string().required().min(3).max(25).error(new Error("Firstname is required")),
        lastName: _joi["default"].string().required().min(3).max(25).error(new Error("Lastname is required")),
        phone: _joi["default"].string().required().min(10).max(10).error(new Error("Phone number is required")),
        email: _joi["default"].string().required().email({
          minDomainSegments: 2
        }).error(new Error("Invalid email address")),
        role: _joi["default"].string().required().allow('user', 'admin', 'supervisor').error(new Error("Invalid user role option")),
        loginId: _joi["default"].string().required().min(7).max(7).error(new Error("Invalid login ID")),
        password: _joi["default"].string().required().min(4).max(15).error(new Error("Password either too short or too long"))
      });

      return schema.validate(user);
    }
  }, {
    key: "validateCompanyBranchDetails",
    value: function validateCompanyBranchDetails(branch) {
      var schema = _joi["default"].object({
        name: _joi["default"].string().required().min(3).max(30).error(new Error("Invalid branch name")),
        ncrNumber: _joi["default"].string().required().min(3).max(10).error(new Error("Invalid ncr number"))
      });

      return schema.validate(branch);
    }
  }]);

  return CompanyValidator;
}();

exports.CompanyValidator = CompanyValidator;