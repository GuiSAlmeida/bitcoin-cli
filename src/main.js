#!/usr/bin/env node
/* eslint-disable import/no-extraneous-dependencies */

const program = require('commander');
const figlet = require('figlet');
const pkg = require('../package.json');
const convertBTC = require('./convertBTC');

program
  .version(pkg.version)
  .description(`${figlet.textSync('bitcoin-cli')}
  Convert Bitcoin to any currency provided
  `)
  .option('-C, --currency <currency>', 'Currency to be converted. (default: USD)')
  .option('-A, --amount <amount>', 'Value in Bitcoin to convert. (default: 1)')
  .parse(process.argv);

convertBTC(program.currency, program.amount);
