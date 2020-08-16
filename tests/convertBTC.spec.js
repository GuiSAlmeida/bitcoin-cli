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

  const responseMock = {
    success: true,
    time: '14-04-2016 13:55:32',
    price: 424.93,
  };

  beforeEach(() => {
    consoleStub = sinon.stub(console, 'info');
  });

  afterEach(() => {
    consoleStub.restore();
  });

  it('should use USD and 1 as amount default', async () => {
    // https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=1
    nock('https://apiv2.bitcoinaverage.com', {
      headers: {
        'x-ba-key': 'M2I5ZTU3OTg4NDA1NDg0Y2I5ZWViMTg1Zjg1YmI4MDg',
      },
    })
      .get('/convert/global')
      .query({ from: 'BTC', to: 'USD', amount: 1 })
      .reply(200, responseMock);

    await convertBTC();
    expect(consoleStub).to.have.been.calledWith(`${chalk.green(1)} BTC to ${chalk.cyan('USD')} = ${chalk.yellow(424.93)}`);
  });

  it('should use USD and 10 as amount default', async () => {
    // https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=10
    nock('https://apiv2.bitcoinaverage.com', {
      headers: {
        'x-ba-key': 'M2I5ZTU3OTg4NDA1NDg0Y2I5ZWViMTg1Zjg1YmI4MDg',
      },
    })
      .get('/convert/global')
      .query({ from: 'BTC', to: 'USD', amount: 10 })
      .reply(200, responseMock);

    await convertBTC('USD', 10);
    expect(consoleStub).to.have.been.calledWith(`${chalk.green(10)} BTC to ${chalk.cyan('USD')} = ${chalk.yellow(424.93)}`);
  });

  it('should use BRL and 1 as amount default', async () => {
    // https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=10
    nock('https://apiv2.bitcoinaverage.com', {
      headers: {
        'x-ba-key': 'M2I5ZTU3OTg4NDA1NDg0Y2I5ZWViMTg1Zjg1YmI4MDg',
      },
    })
      .get('/convert/global')
      .query({ from: 'BTC', to: 'BRL', amount: 1 })
      .reply(200, responseMock);

    await convertBTC('BRL');
    expect(consoleStub).to.have.been.calledWith(`${chalk.green(1)} BTC to ${chalk.cyan('BRL')} = ${chalk.yellow(424.93)}`);
  });

  it('should message user when api reply with error', async () => {
    // https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=USD&amount=10
    nock('https://apiv2.bitcoinaverage.com', {
      headers: {
        'x-ba-key': 'M2I5ZTU3OTg4NDA1NDg0Y2I5ZWViMTg1Zjg1YmI4MDg',
      },
    })
      .get('/convert/global')
      .query({ from: 'BTC', to: 'BRL', amount: 1 })
      .replyWithError('Error');

    await convertBTC('BRL');
    expect(consoleStub).to.have.been.calledWith(chalk.red('Something went wrong in the api.'));
  });
});
