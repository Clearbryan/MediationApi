"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompanyModel = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CompanyModel = /*#__PURE__*/function () {
  function CompanyModel(mongoose) {
    _classCallCheck(this, CompanyModel);

    this.mongoose = mongoose;
  } // create company Schema


  _createClass(CompanyModel, [{
    key: "createCompanySchema",
    value: function createCompanySchema() {
      var Schema = this.mongoose.Schema;
      var companySchema = new Schema({
        details: {
          name: {
            type: String,
            required: true
          },
          tradingName: {
            type: String
          },
          registeredName: {
            type: String
          },
          entityType: {
            type: String
          },
          registrationNumber: {
            type: String,
            required: true
          },
          vat: {
            registered: {
              type: Boolean,
              "default": false
            },
            number: {
              type: String
            }
          }
        },
        contact: [String],
        branches: [String],
        users: [String],
        clients: [String],
        documents: [{
          id: {
            type: String
          },
          // auto generated
          description: {
            type: String
          },
          date: {
            type: String
          },
          createdBy: {
            type: String
          }
        }]
      });
      var Company = this.mongoose.model('Company', companySchema);
      return Company;
    } // find single company

  }, {
    key: "lookUpCompany",
    value: function () {
      var _lookUpCompany = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(registrationNumber) {
        var companyModel, company;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                companyModel = new CompanyModel(this.mongoose);
                company = companyModel.mongoose.models.Company;
                _context.prev = 2;
                _context.next = 5;
                return company.findOne({
                  'details.registrationNumber': registrationNumber
                });

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

      function lookUpCompany(_x) {
        return _lookUpCompany.apply(this, arguments);
      }

      return lookUpCompany;
    }()
  }, {
    key: "companySingleLookup",
    value: function () {
      var _companySingleLookup = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_key, value) {
        var companyModel, company, one;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                companyModel = new CompanyModel(this.mongoose);
                company = companyModel.mongoose.models.Company;
                _context2.prev = 2;
                _context2.next = 5;
                return company.findOne({
                  _key: value
                });

              case 5:
                one = _context2.sent;
                return _context2.abrupt("return", one);

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](2);
                return _context2.abrupt("return", _context2.t0);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 9]]);
      }));

      function companySingleLookup(_x2, _x3) {
        return _companySingleLookup.apply(this, arguments);
      }

      return companySingleLookup;
    }()
  }]);

  return CompanyModel;
}();

exports.CompanyModel = CompanyModel;