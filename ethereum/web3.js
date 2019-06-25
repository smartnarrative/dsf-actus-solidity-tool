import Web3 from 'web3';
import BigNumber from 'bignumber.js';

export let web3;

export async function initializeWeb3 () {
  web3 = new Web3(new Web3.providers.WebsocketProvider('wss://goerli.infura.io/ws/v3/a5d418a8a94240fa8d067ed1ac2313fa'));
}

async function isWeb3Initialized () {
  if (web3 === null || !(await web3.eth.getAccounts())) { 
    throw('WEB3_ERROR: Web3 is not initialized!');
  }
}

export async function getAddress () {
  await isWeb3Initialized();

  const account = (await web3.eth.getAccounts())[0];
  if (!account) { 
    throw('WEB3_ERROR: Account is undefined!') 
  }
  return account;
}

export const fromPrecision = (number) => {
  return new BigNumber(number).shiftedBy(-18).toString();
}
