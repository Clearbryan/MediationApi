"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Branch = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Branch = function Branch(details) {
  _classCallCheck(this, Branch);

  this.name = details.name;
  this.id = details.id;
  this.ncrNumber = details.ncrNumber;
};

exports.Branch = Branch;