#!/usr/bin/env node

/* eslint-disable import/no-extraneous-dependencies */
"use strict";

var program = require('commander');

var figlet = require('figlet');

var pkg = require('../package.json');

var convertBTC = require('./convertBTC');

program.version(pkg.version).description("".concat(figlet.textSync('bitconv-cli'), "\n  Convert Bitcoin to any currency provided\n  ")).option('-C, --currency <currency>', 'Currency to be converted. (default: USD)').option('-A, --amount <amount>', 'Value in Bitcoin to convert. (default: 1)').name('bitconv-cli').usage('[amount] [currency]').parse(process.argv);
convertBTC(program.amount, program.currency);