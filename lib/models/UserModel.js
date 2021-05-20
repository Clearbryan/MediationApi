"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserModel = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UserModel = /*#__PURE__*/function () {
  function UserModel(mongoose) {
    _classCallCheck(this, UserModel);

    this.mongoose = mongoose;
  } // create user schema


  _createClass(UserModel, [{
    key: "createUserSchema",
    value: function createUserSchema() {
      var Schema = this.mongoose.Schema;
      var UserShema = new Schema({
        firstName: {
          type: String
        },
        lastName: {
          type: String
        },
        phone: {
          type: String
        },
        email: {
          type: String
        },
        role: {
          type: String,
          "default": 'user'
        },
        active: {
          type: Boolean
        },
        loginId: {
          type: String
        },
        password: {
          type: String
        },
        company: {
          type: this.mongoose.Schema.Types.ObjectId,
          ref: 'Company'
        }
      });
      var User = this.mongoose.model('User', UserShema);
      return User;
    }
  }]);

  return UserModel;
}();

exports.UserModel = UserModel;