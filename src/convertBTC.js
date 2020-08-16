/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const fetch = require('node-fetch');
const chalk = require('chalk');
const ora = require('ora');

const spinner = ora({
  text: 'Retrieving bitcoin data...',
  color: 'yellow',
});

const convertBTC = async (currency = 'USD', amount = 1) => {
  const url = `https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=${currency}&amount=${amount}`;
  spinner.start();

  return fetch(url, {
    method: 'get',
    headers: {
      'x-ba-key': 'M2I5ZTU3OTg4NDA1NDg0Y2I5ZWViMTg1Zjg1YmI4MDg',
    },
  }).then((res) => {
    spinner.stop();
    return res.json();
  }).then((data) => {
    console.info(`${chalk.green(amount)} BTC to ${chalk.cyan(currency)} = ${chalk.yellow(data.price)}`);
  }).catch((err) => {
    spinner.stop();
    console.info(chalk.red('Something went wrong in the api.'));
    return err;
  });
};

module.exports = convertBTC;
