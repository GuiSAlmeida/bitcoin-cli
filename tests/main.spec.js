/* eslint-disable import/newline-after-import */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const { expect } = require('chai');
const { exec } = require('child_process');
const bitcoinCLI = './src/main.js';
const pkg = require('../package.json');

describe('bitconv-cli', () => {
  it('should return version of bitconv-cli', (done) => {
    exec(`${bitcoinCLI} --version`, (err, stdout, stderr) => {
      if (err) throw err;

      expect(stdout.replace('\n', '')).to.be.equal(pkg.version);
      done();
    });
  });

  it('should return a description when bitconv-cli --help', (done) => {
    exec(`${bitcoinCLI} --help`, (err, stdout, stderr) => {
      if (err) throw err;

      expect(stdout.includes('Convert Bitcoin to any currency provided')).to.be.true;
      done();
    });
  });

  it('should return currency option when bitconv-cli --help', (done) => {
    exec(`${bitcoinCLI} --help`, (err, stdout, stderr) => {
      if (err) throw err;

      expect(stdout.includes('--currency')).to.be.true;
      done();
    });
  });

  it('should return amount option when bitconv-cli --help', (done) => {
    exec(`${bitcoinCLI} --help`, (err, stdout, stderr) => {
      if (err) throw err;

      expect(stdout.includes('--amount')).to.be.true;
      done();
    });
  });
});
