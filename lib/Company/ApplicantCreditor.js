"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApplicantCreditor = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApplicantCreditor = function ApplicantCreditor(details) {
  _classCallCheck(this, ApplicantCreditor);

  this.generalDetails = details.generalDetails;
  this.contractualDetails = details.contractualDetails;
  this.contractDetails = details.contractDetails;
};

exports.ApplicantCreditor = ApplicantCreditor;