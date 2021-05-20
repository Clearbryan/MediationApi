"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreditorModel = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Creditor model
 */
var CreditorModel = /*#__PURE__*/function () {
  function CreditorModel(mongoose) {
    _classCallCheck(this, CreditorModel);

    this.mongoose = mongoose;
  } // Creditor Schema


  _createClass(CreditorModel, [{
    key: "createCreditorSchema",
    value: function createCreditorSchema() {
      var Schema = this.mongoose.Schema;
      var creditorSchema = new Schema({
        name: {
          type: String,
          required: true
        },
        description: {
          type: String
        },
        ncrNumber: {
          type: String
        },
        type: {
          type: String
        },
        active: {
          type: Boolean,
          "default": true
        },
        deductPDAFee: {
          type: Boolean,
          "default": false
        },
        status: {
          verified: {
            type: Boolean,
            "default": false
          }
        },
        contact: {
          phone: [{
            type: {
              type: String
            },
            number: {
              type: String
            }
          }],
          email: [{
            type: {
              type: String
            },
            address: {
              type: String
            }
          }]
        },
        banking: {
          bankName: {
            type: String
          },
          accountNumber: {
            type: String
          },
          accountType: {
            type: String
          },
          branchName: {
            type: String
          },
          branchCode: {
            type: String
          }
        },
        address: {
          street: {
            type: String
          },
          city: {
            type: String
          },
          province: {
            type: String
          },
          postalCode: {
            type: String
          },
          country: {
            type: String
          }
        },
        submited: {
          by: {
            type: String,
            date: String
          }
        }
      });
      var Creditor = this.mongoose.model('Creditor', creditorSchema);
      return Creditor;
    }
  }]);

  return CreditorModel;
}();

exports.CreditorModel = CreditorModel;