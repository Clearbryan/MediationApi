"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApplicantRoutes = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _lodash = _interopRequireDefault(require("lodash"));

var _validator_functions = _interopRequireDefault(require("../validators/validator_functions"));

var _passport = _interopRequireDefault(require("passport"));

var _payment_setup_validator = require("../validators/payment_setup_validator");

var _ApplicanBudget = require("../Budget/ApplicanBudget");

var _budget_validator = require("../validators/budget_validator");

var _fee_validator = require("../validators/fee_validator");

var _BudgetModel = require("../models/BudgetModel");

var _ApplicantPaymentSetup = require("../Payments/ApplicantPaymentSetup");

var _company_auth = require("../auth/company_auth");

var _ApplicantModel = require("../models/ApplicantModel");

var _Aplicant = require("../Applicants/Aplicant");

var _CreditorModel = require("../models/CreditorModel");

var _helper = require("../helpers/helper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var isUser = _company_auth.companyAuth.isUser,
    isAdmin = _company_auth.companyAuth.isAdmin;
var helper = new _helper.Helper();
var budgetValidator = new _budget_validator.BudgetValidator();
var setupValidator = new _payment_setup_validator.PaymentSetupValidator();
var feeValidator = new _fee_validator.FeeValidator();
var applicantModel = new _ApplicantModel.ApplicantModel(_mongoose["default"]).mongoose.models.Applicant;
var budgetModel = new _BudgetModel.BudgetModel(_mongoose["default"]).mongoose.models.Budget;
var creditorModel = new _CreditorModel.CreditorModel(_mongoose["default"]).mongoose.models;

var ApplicantRoutes = /*#__PURE__*/function () {
  function ApplicantRoutes(express) {
    _classCallCheck(this, ApplicantRoutes);

    this.router = express.Router();
  } // add a new applicant


  _createClass(ApplicantRoutes, [{
    key: "addApplicant",
    value: function addApplicant() {
      // @ POST - ROUTE (Add new applicant -requires user login)
      return this.router.post('/add', _passport["default"].authenticate('jwt', {
        session: false
      }), isUser, /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
          var validationResult, error, value, newApplicant, applicant, response, success, _error, errorMessage;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return new _validator_functions["default"]().validateApplicantDetails(req.body);

                case 3:
                  validationResult = _context.sent;
                  error = validationResult.error, value = validationResult.value;

                  if (!error) {
                    _context.next = 9;
                    break;
                  }

                  return _context.abrupt("return", res.status(400).json({
                    success: false,
                    errorMessage: error.message
                  }));

                case 9:
                  newApplicant = _objectSpread(_objectSpread({}, value), {}, {
                    assignedTo: req.user.company
                  });
                  applicant = new _Aplicant.Applicant(newApplicant);
                  _context.next = 13;
                  return applicant.create(req.user.company);

                case 13:
                  response = _context.sent;
                  success = response.success, _error = response.error;

                  if (!success) {
                    _context.next = 19;
                    break;
                  }

                  res.status(200).json({
                    success: true,
                    message: 'Applicant successfully added'
                  });
                  _context.next = 21;
                  break;

                case 19:
                  errorMessage = helper.checkDuplicate(_error);
                  return _context.abrupt("return", res.status(400).json({
                    success: success,
                    errorMessage: errorMessage
                  }));

                case 21:
                  _context.next = 26;
                  break;

                case 23:
                  _context.prev = 23;
                  _context.t0 = _context["catch"](0);
                  return _context.abrupt("return", res.json({
                    success: false,
                    errorMessage: "Something went wrong on, please contact admin!"
                  }));

                case 26:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[0, 23]]);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    } // add applicant payment setup

  }, {
    key: "addPaymentSetup",
    value: function addPaymentSetup() {
      return this.router.post('/add/payment-setup', _passport["default"].authenticate('jwt', {
        session: false
      }), isUser, /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
          var applicantId, isIdValid, validationResult, error, value, setUp, paymentSetup, response;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.prev = 0;
                  applicantId = req.query.applicantId;
                  isIdValid = _mongoose["default"].isValidObjectId(applicantId); // if ivalid id

                  if (isIdValid) {
                    _context2.next = 7;
                    break;
                  }

                  return _context2.abrupt("return", res.status(403).json({
                    success: false,
                    errorMessage: 'Malinformed applicant Id'
                  }));

                case 7:
                  _context2.next = 9;
                  return setupValidator.validatePaymentSetup(req.body);

                case 9:
                  validationResult = _context2.sent;
                  error = validationResult.error, value = validationResult.value; // if validation error

                  if (!error) {
                    _context2.next = 15;
                    break;
                  }

                  return _context2.abrupt("return", res.status(400).json({
                    success: false,
                    errorMessage: error.message
                  }));

                case 15:
                  // validation successfull, proceed
                  setUp = _objectSpread(_objectSpread({}, value), {}, {
                    applicant: applicantId
                  });
                  paymentSetup = new _ApplicantPaymentSetup.PaymentSetup(setUp);
                  _context2.next = 19;
                  return paymentSetup.create();

                case 19:
                  response = _context2.sent;

                  if (!response.error) {
                    _context2.next = 28;
                    break;
                  }

                  if (!(response.error.code === 11000)) {
                    _context2.next = 25;
                    break;
                  }

                  return _context2.abrupt("return", res.status(400).json({
                    success: false,
                    errorMessage: 'Multiple payment setups not allowed'
                  }));

                case 25:
                  return _context2.abrupt("return", res.status(500).json({
                    success: false,
                    errorMessage: response.error.message
                  }));

                case 26:
                  _context2.next = 31;
                  break;

                case 28:
                  _context2.next = 30;
                  return applicantModel.findByIdAndUpdate(applicantId, {
                    paymentSetup: response.result._id
                  });

                case 30:
                  res.status(200).json({
                    success: true,
                    message: 'Payment setup successfully added'
                  });

                case 31:
                  _context2.next = 36;
                  break;

                case 33:
                  _context2.prev = 33;
                  _context2.t0 = _context2["catch"](0);
                  return _context2.abrupt("return", res.status(500).json({
                    success: false,
                    errorMessage: _context2.t0.message
                  }));

                case 36:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, null, [[0, 33]]);
        }));

        return function (_x3, _x4) {
          return _ref2.apply(this, arguments);
        };
      }());
    } // add applicant budget

  }, {
    key: "addBudget",
    value: function addBudget() {
      return this.router.post('/add/budget', _passport["default"].authenticate('jwt', {
        session: false
      }), isUser, /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
          var applicantId, isIdValid, validationResult, error, value, income, deductions, expenses, grossIncome, totalDeductions, totalExpense, netIncome, totalAvaillableForDistribution, recurringFee, netAvaillableForDistribution, fees, newBudget, budget, result;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.prev = 0;
                  applicantId = req.query.applicantId;
                  isIdValid = _mongoose["default"].isValidObjectId(applicantId); // if ivalid id

                  if (isIdValid) {
                    _context3.next = 7;
                    break;
                  }

                  return _context3.abrupt("return", res.status(403).json({
                    success: false,
                    errorMessage: 'Malinformed applicant Id'
                  }));

                case 7:
                  _context3.next = 9;
                  return budgetValidator.validateBudget(req.body);

                case 9:
                  validationResult = _context3.sent;
                  error = validationResult.error, value = validationResult.value; // if validation fails

                  if (!error) {
                    _context3.next = 15;
                    break;
                  }

                  return _context3.abrupt("return", res.status(400).json({
                    success: false,
                    errorMessage: error.message
                  }));

                case 15:
                  // validation passed
                  // perform calculation for the budget
                  income = value.income, deductions = value.deductions, expenses = value.expenses; // calculate budget

                  grossIncome = helper.calculateGrossIncome(income);
                  totalDeductions = helper.calculateTotalDeductions(deductions);
                  totalExpense = helper.calculateTotalExpense(expenses);
                  netIncome = helper.calculateNetIncome(grossIncome, totalDeductions);
                  totalAvaillableForDistribution = helper.calculateTotalAvailForDist(netIncome, totalExpense);
                  recurringFee = helper.calculateRecuringFee(totalAvaillableForDistribution);
                  netAvaillableForDistribution = helper.calculateNetAvailForDist(totalAvaillableForDistribution, recurringFee);
                  fees = [{
                    type: 'Once Off',
                    amount: totalAvaillableForDistribution,
                    balance: 0
                  }]; // attempt ot save

                  newBudget = _objectSpread(_objectSpread({}, value), {}, {
                    applicant: applicantId,
                    grossIncome: grossIncome,
                    totalDeductions: totalDeductions,
                    totalExpense: totalExpense,
                    recurringFee: recurringFee,
                    netAvaillableForDistribution: netAvaillableForDistribution,
                    totalAvaillableForDistribution: totalAvaillableForDistribution,
                    netIncome: netIncome,
                    fees: fees
                  });
                  budget = new _ApplicanBudget.Budget(newBudget);
                  _context3.next = 28;
                  return budget.create();

                case 28:
                  result = _context3.sent;

                  if (!result.error) {
                    _context3.next = 37;
                    break;
                  }

                  if (!(result.error.code === 11000)) {
                    _context3.next = 34;
                    break;
                  }

                  return _context3.abrupt("return", res.status(400).json({
                    success: false,
                    errorMessage: 'Multiple budgets not allowed'
                  }));

                case 34:
                  return _context3.abrupt("return", res.status(500).json({
                    success: false,
                    errorMessage: result.error.message
                  }));

                case 35:
                  _context3.next = 40;
                  break;

                case 37:
                  _context3.next = 39;
                  return applicantModel.findByIdAndUpdate(applicantId, {
                    budget: result.result._id
                  });

                case 39:
                  res.status(200).json({
                    success: true,
                    message: 'Budget successfully added'
                  });

                case 40:
                  _context3.next = 45;
                  break;

                case 42:
                  _context3.prev = 42;
                  _context3.t0 = _context3["catch"](0);
                  return _context3.abrupt("return", res.status(500).json({
                    success: false,
                    errorMessage: _context3.t0.message
                  }));

                case 45:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, null, [[0, 42]]);
        }));

        return function (_x5, _x6) {
          return _ref3.apply(this, arguments);
        };
      }());
    } // add fee

  }, {
    key: "addFee",
    value: function addFee() {
      return this.router.post('/add/fee', _passport["default"].authenticate('jwt', {
        session: false
      }), isUser, /*#__PURE__*/function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
          var applicantId, isIdValid, validationResult, error, value, budget, isDuplicate;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.prev = 0;
                  applicantId = req.query.applicantId;
                  isIdValid = _mongoose["default"].isValidObjectId(applicantId); // if ivalid id

                  if (isIdValid) {
                    _context4.next = 7;
                    break;
                  }

                  return _context4.abrupt("return", res.status(403).json({
                    success: false,
                    errorMessage: 'Malinformed applicant Id'
                  }));

                case 7:
                  _context4.next = 9;
                  return feeValidator.validateFee(req.body);

                case 9:
                  validationResult = _context4.sent;
                  error = validationResult.error, value = validationResult.value;

                  if (!error) {
                    _context4.next = 15;
                    break;
                  }

                  return _context4.abrupt("return", res.status(400).json({
                    success: false,
                    errorMessage: error.message
                  }));

                case 15:
                  _context4.next = 17;
                  return budgetModel.findOne({
                    applicant: applicantId
                  });

                case 17:
                  budget = _context4.sent;

                  if (budget) {
                    _context4.next = 22;
                    break;
                  }

                  return _context4.abrupt("return", res.status(404).json({
                    success: false,
                    errorMessage: 'Applicant not found'
                  }));

                case 22:
                  // check duplicate types
                  isDuplicate = budget.fees.filter(function (el) {
                    return el.type === value.type;
                  });

                  if (!(isDuplicate.length > 0)) {
                    _context4.next = 27;
                    break;
                  }

                  return _context4.abrupt("return", res.status(400).json({
                    success: false,
                    errorMessage: 'Duplicate fee title found'
                  }));

                case 27:
                  budget.fees.push(value);
                  _context4.next = 30;
                  return budget.save();

                case 30:
                  res.status(200).json({
                    success: true,
                    message: 'Fee successfully added'
                  });

                case 31:
                  _context4.next = 36;
                  break;

                case 33:
                  _context4.prev = 33;
                  _context4.t0 = _context4["catch"](0);
                  return _context4.abrupt("return", res.status(500).json({
                    success: false,
                    errorMessage: _context4.t0.message
                  }));

                case 36:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, null, [[0, 33]]);
        }));

        return function (_x7, _x8) {
          return _ref4.apply(this, arguments);
        };
      }());
    } // add creditors

  }, {
    key: "addApplicantCreditor",
    value: function addApplicantCreditor() {
      return this.router.post('/creditors/add', _passport["default"].authenticate('jwt', {
        session: false
      }), isUser, /*#__PURE__*/function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
          var applicantId, isIdValid, _applicantId, _isIdValid, creditors, applicantCreditorOptions, applicant, prePopulate;

          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  applicantId = req.query.applicantId;

                  if (applicantId) {
                    _context5.next = 5;
                    break;
                  }

                  return _context5.abrupt("return", res.status(403).json({
                    success: false,
                    errorMessage: 'Forbidden'
                  }));

                case 5:
                  isIdValid = _mongoose["default"].isValidObjectId(applicantId); // if ivalid id

                  if (isIdValid) {
                    _context5.next = 10;
                    break;
                  }

                  return _context5.abrupt("return", res.status(403).json({
                    success: false,
                    errorMessage: 'Malinformed applicant Id'
                  }));

                case 10:
                  _context5.prev = 10;
                  _applicantId = req.query.applicantId;
                  _isIdValid = _mongoose["default"].isValidObjectId(_applicantId); // if ivalid id

                  if (_isIdValid) {
                    _context5.next = 17;
                    break;
                  }

                  return _context5.abrupt("return", res.status(403).json({
                    success: false,
                    errorMessage: 'Malinformed applicant Id'
                  }));

                case 17:
                  _context5.next = 19;
                  return creditorModel.Creditor.find();

                case 19:
                  creditors = _context5.sent;
                  applicantCreditorOptions = creditors.map(function (el) {
                    return _lodash["default"].pick(el, ['banking', 'name', 'status', 'ncrNumber', 'type']);
                  }); // add creditor details to applicant

                  _context5.next = 23;
                  return applicantModel.findByIdAndUpdate(_applicantId);

                case 23:
                  applicant = _context5.sent;
                  applicantCreditorOptions.forEach(function (el) {
                    prePopulate = _lodash["default"].pick(el, ['name', 'ncrNumber', 'status']);
                    prePopulate['accountNumber'] = el.banking.accountNumber;
                    prePopulate['feedback'] = 'awaiting';
                    applicant.creditors.push(prePopulate);
                  });
                  _context5.next = 27;
                  return applicant.save();

                case 27:
                  res.status(200).json({
                    success: true,
                    message: 'Creditor assigned successfully'
                  });

                case 28:
                  _context5.next = 33;
                  break;

                case 30:
                  _context5.prev = 30;
                  _context5.t0 = _context5["catch"](10);
                  return _context5.abrupt("return", res.status(400).json({
                    success: false,
                    errorMessage: _context5.t0.message
                  }));

                case 33:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5, null, [[10, 30]]);
        }));

        return function (_x9, _x10) {
          return _ref5.apply(this, arguments);
        };
      }());
    } // get single applicant

  }, {
    key: "getApplicants",
    value: function getApplicants() {
      return this.router.get('/', /*#__PURE__*/function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res, next) {
          var applicantModel, result;
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  applicantModel = new _ApplicantModel.ApplicantModel(_mongoose["default"]);
                  _context6.prev = 1;
                  _context6.next = 4;
                  return applicantModel.retrieveApplicants();

                case 4:
                  result = _context6.sent;
                  return _context6.abrupt("return", res.status(200).json({
                    success: true,
                    result: result
                  }));

                case 8:
                  _context6.prev = 8;
                  _context6.t0 = _context6["catch"](1);
                  return _context6.abrupt("return", res.status(500).json({
                    success: false,
                    errorMessage: "Something went wrong on, please contact admin!"
                  }));

                case 11:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6, null, [[1, 8]]);
        }));

        return function (_x11, _x12, _x13) {
          return _ref6.apply(this, arguments);
        };
      }());
    }
  }]);

  return ApplicantRoutes;
}();

exports.ApplicantRoutes = ApplicantRoutes;