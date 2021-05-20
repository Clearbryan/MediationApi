"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminModel = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AdminModel = /*#__PURE__*/function () {
  function AdminModel(mongoose) {
    _classCallCheck(this, AdminModel);

    this.mongoose = mongoose;
  }

  _createClass(AdminModel, [{
    key: "createAdminSchema",
    value: function createAdminSchema() {
      var Schema = this.mongoose.Schema;
      var adminSchema = new Schema({
        loginId: {
          type: String,
          required: true
        },
        email: {
          type: String,
          required: true
        },
        password: {
          type: String,
          required: true
        },
        accessLevel: {
          type: Number,
          "default": 4
        }
      });
      var Admin = this.mongoose.model('Admin', adminSchema);
      return Admin;
    }
  }]);

  return AdminModel;
}();

exports.AdminModel = AdminModel;