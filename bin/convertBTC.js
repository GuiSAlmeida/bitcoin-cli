"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/* eslint-disable no-console */

/* eslint-disable import/no-extraneous-dependencies */
var fetch = require('node-fetch');

var chalk = require('chalk');

var ora = require('ora');

var spinner = ora({
  text: 'Retrieving bitcoin data...',
  color: 'yellow'
});

var convertBTC = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var amount,
        currency,
        url,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            amount = _args.length > 0 && _args[0] !== undefined ? _args[0] : 1;
            currency = _args.length > 1 && _args[1] !== undefined ? _args[1] : 'USD';
            url = "https://blockchain.info/tobtc?currency=".concat(currency, "&value=").concat(amount);
            spinner.start();
            return _context.abrupt("return", fetch(url).then(function (res) {
              spinner.stop();
              return res.json();
            }).then(function (data) {
              console.info("".concat(chalk.green(amount), " ").concat(chalk.cyan(currency), " = ").concat(chalk.yellow(data), "BTC"));
            })["catch"](function (err) {
              spinner.stop();
              console.info(chalk.red('Something went wrong in the api.'));
              return err;
            }));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function convertBTC() {
    return _ref.apply(this, arguments);
  };
}();

module.exports = convertBTC;