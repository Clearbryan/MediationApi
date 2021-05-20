"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Person = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Person = function Person(details) {
  _classCallCheck(this, Person);

  this.firstName = details.firstName;
  this.title = details.title;
  this.lastName = details.lastName;
  this.gender = details.gender;
  this.idNumber = details.idNumber;
  this.race = details.race;
  this.contact = details.contact;
  this.email = details.email;
  this.address = details.address;
  this.dateOfBirth = details.dateOfBirth;
  this.maritalStatus = details.maritalStatus;
};

exports.Person = Person;