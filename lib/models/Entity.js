"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Entity = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Company Model
 */
var Entity = function Entity(entityName, number, description, address, contact, banking) {
  _classCallCheck(this, Entity);

  this.entityName = entityName;
  this.number = number;
  this.description = description;
  this.address = address;
  this.contact = contact;
  this.banking = banking;
};

exports.Entity = Entity;