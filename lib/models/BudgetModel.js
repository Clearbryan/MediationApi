"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BudgetModel = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BudgetModel = /*#__PURE__*/function () {
  function BudgetModel(mongoose) {
    _classCallCheck(this, BudgetModel);

    this.mongoose = mongoose;
  } // create budget schema


  _createClass(BudgetModel, [{
    key: "createBudgetSchema",
    value: function createBudgetSchema() {
      var Schema = this.mongoose.Schema;
      var budgetSchema = new Schema({
        income: [{
          type: {
            type: String
          },
          amount: {
            type: Number
          },
          comment: {
            type: String
          }
        }],
        deductions: [{
          type: {
            type: String
          },
          amount: {
            type: Number
          },
          comment: {
            type: String
          }
        }],
        expenses: [{
          type: {
            type: String
          },
          amount: {
            type: Number
          },
          comment: {
            type: String
          }
        }],
        fees: [{
          type: {
            type: String
          },
          amount: {
            type: Number
          },
          balance: {
            type: Number
          }
        }],
        grossIncome: {
          type: Number
        },
        netIncome: {
          type: Number
        },
        totalExpense: {
          type: Number
        },
        totalDeductions: {
          type: Number
        },
        recurringFee: {
          type: Number
        },
        netAvaillableForDistribution: {
          type: Number
        },
        totalAvaillableForDistribution: {
          type: Number
        },
        applicant: {
          type: this.mongoose.Schema.Types.ObjectId,
          ref: 'Applicant'
        }
      });
      var Budget = this.mongoose.model('Budget', budgetSchema);
      return Budget;
    }
  }]);

  return BudgetModel;
}();

exports.BudgetModel = BudgetModel;