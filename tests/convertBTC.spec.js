/* eslint-disable no-undef */
const nock = require('nock');
const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chalk = require('chalk');

chai.use(sinonChai);

const convertBTC = require('../src/convertBTC.js');

describe('convertBTC', () => {
  let consoleStub;

  beforeEach(() => {
    consoleStub = sinon.stub(console, 'info');
  });

  afterEach(() => {
    consoleStub.restore();
  });

  it('should use USD and 1 as amount default', async () => {
    nock('https://blockchain.info')
      .get('/tobtc')
      .query({ currency: 'USD', value: 1 })
      .reply(200, 0.00001727);

    await convertBTC();
    expect(consoleStub).to.have.been.calledWith(`${chalk.green(1)} ${chalk.cyan('USD')} = ${chalk.yellow(0.00001727)}BTC`);
  });

  it('should use USD and 10 as amount default', async () => {
    nock('https://blockchain.info')
      .get('/tobtc')
      .query({ currency: 'USD', value: 10 })
      .reply(200, 0.00017256);

    await convertBTC(10, 'USD');
    expect(consoleStub).to.have.been.calledWith(`${chalk.green(10)} ${chalk.cyan('USD')} = ${chalk.yellow(0.00017256)}BTC`);
  });

  it('should use BRL and 1 as amount default', async () => {
    nock('https://blockchain.info')
      .get('/tobtc')
      .query({ currency: 'BRL', value: 1 })
      .reply(200, 0.00000329);

    await convertBTC(1, 'BRL');
    expect(consoleStub).to.have.been.calledWith(`${chalk.green(1)} ${chalk.cyan('BRL')} = ${chalk.yellow(0.00000329)}BTC`);
  });

  it('should message user when api reply with error', async () => {
    nock('https://blockchain.info')
      .get('/tobtc')
      .query({ currency: 'BRL', value: 1 })
      .replyWithError('Error');

    await convertBTC('BRL');
    expect(consoleStub).to.have.been.calledWith(chalk.red('Something went wrong in the api.'));
  });
});
