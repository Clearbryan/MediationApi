"use strict";

require("dotenv/config");

var _helmet = _interopRequireDefault(require("helmet"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _passport = _interopRequireDefault(require("passport"));

var _users = require("./routes/users");

var _UserModel = require("./models/UserModel");

var _db = require("./database/db");

var _applicants = require("./routes/applicants");

var _creditors = require("./routes/creditors");

var _company = require("./routes/company");

var _admin = require("./routes/admin");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var creditorRouter = new _creditors.CreditorRoutes(_express["default"]);
var adminRoutes = new _admin.AdminRoutes(_express["default"]);
var applicantRouter = new _applicants.ApplicantRoutes(_express["default"]);
var userRouter = new _users.UserRoutes(_express["default"]);
var companyRouter = new _company.CompanyRoutes(_express["default"]);
var userModel = new _UserModel.UserModel(_mongoose["default"]).mongoose.models.User;
var PORT = process.env.PORT || 5000;
new _db.Database(_mongoose["default"]).connect();

require('./auth/Passport')(_passport["default"], userModel);

var app = (0, _express["default"])(); // application middleware 

app.use((0, _cors["default"])());
app.use((0, _helmet["default"])());
app.use(_express["default"].json()); // passport middleware

app.use(_passport["default"].initialize());
app.use(_passport["default"].session()); // application routes

app.use('/users', userRouter.register());
app.use('/users', userRouter.login());
app.use('/admin', adminRoutes.addSuperAdminUser());
app.use('/admin', adminRoutes.getCreditors());
app.use('/admin', adminRoutes.getCompanies());
app.use('/admin', adminRoutes.superAdminLogin());
app.use('/applicants', applicantRouter.getApplicants());
app.use('/applicants', applicantRouter.addApplicant());
app.use('/applicants', applicantRouter.addBudget());
app.use('/applicants', applicantRouter.addFee());
app.use('/applicants', applicantRouter.addPaymentSetup());
app.use('/applicants', applicantRouter.addApplicantCreditor());
app.use('/creditors', creditorRouter.addCreditor());
app.use('/creditors', creditorRouter.getCreditors());
app.use('/company', companyRouter.addCompanyUser());
app.listen(PORT, console.log("app running on port: ".concat(PORT)));