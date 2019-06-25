const Web3 = require('web3');
const BigNumber = require('bignumber.js');

let web3;

// export { web3 };

async function initializeWeb3 () {
  web3 = new Web3(new Web3.providers.WebsocketProvider('wss://goerli.infura.io/ws/v3/a5d418a8a94240fa8d067ed1ac2313fa'));
}

async function isWeb3Initialized () {
  if (web3 === null || !(await web3.eth.getAccounts())) { 
    throw('WEB3_ERROR: Web3 is not initialized!');
  }
}

async function getAddress () {
  await isWeb3Initialized();

  const account = (await web3.eth.getAccounts())[0];
  if (!account) { 
    throw('WEB3_ERROR: Account is undefined!') 
  }
  return account;
}

const fromPrecision = (number) => {
  return new BigNumber(number).shiftedBy(-18).toString();
}

module.exports = {
  web3: web3,
  initializeWeb3: initializeWeb3,
  getAddress, getAddress,
  fromPrecision, fromPrecision
};