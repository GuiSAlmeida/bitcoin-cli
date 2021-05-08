/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const fetch = require('node-fetch');
const chalk = require('chalk');
const ora = require('ora');

const spinner = ora({
  text: 'Retrieving bitcoin data...',
  color: 'yellow',
});

const convertBTC = async (amount = 1, currency = 'USD') => {
  const url = `https://blockchain.info/tobtc?currency=${currency}&value=${amount}`;
  spinner.start();
  return fetch(url).then((res) => {
    spinner.stop();
    return res.json();
  }).then((data) => {
    console.info(`${chalk.green(amount)} ${chalk.cyan(currency)} = ${chalk.yellow(data)}BTC`);
  }).catch((err) => {
    spinner.stop();
    console.info(chalk.red('Something went wrong in the api.'));
    return err;
  });
};

module.exports = convertBTC;
