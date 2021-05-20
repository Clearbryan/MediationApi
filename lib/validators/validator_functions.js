"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Validator = /*#__PURE__*/function () {
  function Validator() {
    _classCallCheck(this, Validator);
  }

  _createClass(Validator, [{
    key: "validateApplicantDetails",
    value: function validateApplicantDetails(applicant) {
      var schema = _joi["default"].object({
        title: _joi["default"].string().required().min(2).max(10).error(new Error("Title is required")),
        firstName: _joi["default"].string().required().min(4).max(25).error(new Error("Applicant firstname is required")),
        lastName: _joi["default"].string().required().min(4).max(25).error(new Error("Applicant lastname is required")),
        idNumber: _joi["default"].string().required().min(13).max(13).error(new Error("Invalid Id Number")),
        dateOfBirth: _joi["default"].date().required().error(new Error("Application DOB is required")),
        maritalStatus: _joi["default"].string().required().valid('Married', 'Single', 'Divorced', 'Separated'),
        marriageType: _joi["default"].string().valid('Civil Union', 'Common Law Marriage', 'Married In Community of Property', 'Married Out of Community of Property', 'Married Out of Community of Property Accrual', 'Traditional', 'Traditional - Not Registered', 'Not Applicable'),
        internalRefNumber: _joi["default"].string().required().min(10).max(10).error(new Error("Reference number is required")),
        status: _joi["default"].string().required().valid('In processing', 'submitted for fees', 'distriibution', 'canceled'),
        branch: _joi["default"].string().required().max(25).error(new Error("Applicant branch is required")),
        applicationDate: _joi["default"].date().required().error(new Error("Application date is required")),
        gender: _joi["default"].string().required().valid('Male', 'Female').error(new Error("Applicant gender is required")),
        race: _joi["default"].string().required().valid('Afican (Black)', 'Coloured', 'Indian', 'White', 'Chinese').error(new Error("Applicant ethnicity is required")),
        contact: _joi["default"].string().min(10).max(10).required().error(new Error("Applicant contact number is required")),
        email: _joi["default"].string().email({
          minDomainSegments: 2
        }).required().error(new Error("Invalid or missing Applicant email")),
        address: _joi["default"].object({
          street: _joi["default"].string().required().max(25).error(new Error("Applicant street address is required")),
          city: _joi["default"].string().required().max(25).error(new Error("Aplicant city is required")),
          province: _joi["default"].string().required().valid('Western Cape', 'Gauteng', 'KwaZulu Natal', 'North West').error(new Error("Applicant province is required")),
          postalCode: _joi["default"].string().min(4).max(4).required().error(new Error("Applicant postal code is required")),
          country: _joi["default"].string().required().valid('South Africa').error(new Error("Invalid or unsupported country"))
        })
      });

      return schema.validate(applicant);
    }
  }]);

  return Validator;
}();

exports["default"] = Validator;