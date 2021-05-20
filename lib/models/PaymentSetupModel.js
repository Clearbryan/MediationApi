"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaymentSetupModel = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PaymentSetupModel = /*#__PURE__*/function () {
  function PaymentSetupModel(mongoose) {
    _classCallCheck(this, PaymentSetupModel);

    this.mongoose = mongoose;
  } // create payment setup schema


  _createClass(PaymentSetupModel, [{
    key: "createPaymentSchema",
    value: function createPaymentSchema() {
      var Schema = this.mongoose.Schema;
      var paymentSetUpSchema = new Schema({
        frequency: {
          type: String
        },
        commission: {
          type: Number
        },
        commissionPercentage: {
          type: Number
        },
        proposedEscallationValue: {
          type: Number
        },
        proposedEscallationPercentage: {
          type: Number
        },
        type: {
          type: String
        },
        firstPaymentDueDate: {
          type: String
        },
        firstPaymentDistributionDate: {
          type: String
        },
        applicant: {
          type: this.mongoose.Schema.Types.ObjectId,
          ref: 'Applicant'
        },
        bankingDetails: {
          name: {
            type: String
          },
          branch: {
            type: String
          },
          branchCode: {
            type: String
          },
          accountNumber: {
            type: String
          },
          accountType: {
            type: String
          },
          installment: {
            type: Number
          }
        }
      });
      var PaymentSetup = this.mongoose.model('PaymentSetup', paymentSetUpSchema);
      return PaymentSetup;
    }
  }]);

  return PaymentSetupModel;
}();

exports.PaymentSetupModel = PaymentSetupModel;