"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Database = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Database = /*#__PURE__*/function () {
  function Database(mongoose) {
    _classCallCheck(this, Database);

    this.mongoose = mongoose;
  }

  _createClass(Database, [{
    key: "connect",
    value: function () {
      var _connect = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.mongoose.connect(process.env.DB_URI, {
                  useNewUrlParser: true,
                  useUnifiedTopology: true,
                  useFindAndModify: false
                });

              case 3:
                console.log("Successfully connected to MongoDB...");
                _context.next = 10;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);
                console.log("Failed to connect to Database...");
                process.exit(1);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 6]]);
      }));

      function connect() {
        return _connect.apply(this, arguments);
      }

      return connect;
    }()
  }]);

  return Database;
}();

exports.Database = Database;