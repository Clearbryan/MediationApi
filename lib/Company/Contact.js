"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Contact = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Contact = function Contact(details) {
  _classCallCheck(this, Contact);

  this.name = details.name;
  this.cell = details.cell;
  this.tel = detils.tel;
  this.fax = details.fax;
  this.email = details.email;
};

exports.Contact = Contact;