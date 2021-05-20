"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApplicantModel = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ApplicantModel = /*#__PURE__*/function () {
  function ApplicantModel(mongoose) {
    _classCallCheck(this, ApplicantModel);

    this.mongoose = mongoose;
  }

  _createClass(ApplicantModel, [{
    key: "applicantSchema",
    value: function applicantSchema() {
      var Schema = this.mongoose.Schema;
      var applicantSchema = new Schema({
        title: {
          type: String,
          required: true
        },
        firstName: {
          type: String,
          required: true
        },
        lastName: {
          type: String,
          required: true
        },
        idNumber: {
          type: String,
          required: true
        },
        applicationDate: {
          type: String,
          required: true
        },
        status: {
          type: String,
          "default": 'in processing'
        },
        internalRefNumber: {
          type: String,
          required: true
        },
        // auto generate a 10 digit string / number
        branch: {
          type: String,
          required: true
        },
        // come from setting-company
        dateOfBirth: {
          type: String,
          required: true
        },
        maritalStatus: {
          type: String,
          required: true
        },
        marriageType: {
          type: String
        },
        gender: {
          type: String,
          required: true
        },
        race: {
          type: String,
          required: true
        },
        contact: {
          type: String,
          required: true
        },
        email: {
          type: String,
          required: true
        },
        address: {
          street: {
            type: String,
            required: true
          },
          city: {
            type: String,
            required: true
          },
          province: {
            type: String,
            required: true
          },
          postalCode: {
            type: String,
            required: true
          },
          country: {
            type: String,
            required: true
          }
        },
        paymentSetup: {
          type: this.mongoose.Schema.Types.ObjectId,
          ref: 'PaymentSetup'
        },
        budget: {
          type: this.mongoose.Schema.Types.ObjectId,
          ref: 'Budget'
        },
        assignedTo: {
          type: this.mongoose.Schema.Types.ObjectId,
          ref: 'Company'
        },
        creditors: [{
          accountNumber: {
            type: String
          },
          ncrNumber: {
            type: String
          },
          name: {
            type: String
          },
          feedback: {
            type: String,
            "default": 'Awaiting'
          },
          status: {
            type: String
          },
          cob: {
            type: Number,
            "default": 0
          },
          installment: {
            type: Number,
            "default": 0
          },
          source: {
            type: String
          },
          interest: {
            type: Number,
            "default": 0
          },
          balance: {
            type: Number,
            "default": 0
          },
          remainingTerm: {
            original: {
              type: Number,
              "default": 0
            },
            revised: {
              type: Number,
              "default": 0
            }
          }
        }],
        documents: {
          uploads: [String],
          proposals: [String],
          debitOrders: [String],
          powerOfAttorney: [String],
          cobs: [String],
          application: [String]
        }
      });
      var Applicant = this.mongoose.model('Applicant', applicantSchema);
      return Applicant;
    } // retrieve all appllicants

  }, {
    key: "retrieveApplicants",
    value: function () {
      var _retrieveApplicants = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var applicantModel, applicant;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                applicantModel = new ApplicantModel(this.mongoose);
                applicant = applicantModel.mongoose.models.Applicant;
                _context.prev = 2;
                _context.next = 5;
                return applicant.find();

              case 5:
                return _context.abrupt("return", _context.sent);

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](2);
                return _context.abrupt("return", _context.t0);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 8]]);
      }));

      function retrieveApplicants() {
        return _retrieveApplicants.apply(this, arguments);
      }

      return retrieveApplicants;
    }()
  }]);

  return ApplicantModel;
}();

exports.ApplicantModel = ApplicantModel;