#!/usr/bin/env node

/* eslint-disable import/no-extraneous-dependencies */
"use strict";

var program = require('commander');

var figlet = require('figlet');

var pkg = require('../package.json');

var convertBTC = require('./convertBTC');

program.version(pkg.version).description("".concat(figlet.textSync('bitconv-cli'), "\n  Convert Bitcoin to any currency provided\n  ")).option('-C, --currency <currency>', 'Currency to be converted. (default: USD)').option('-A, --amount <amount>', 'Value in Bitcoin to convert. (default: 1)').parse(process.argv);
convertBTC(program.currency, program.amount);