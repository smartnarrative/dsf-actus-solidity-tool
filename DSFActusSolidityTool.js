const initializeWeb3 = require('./ethereum/web3');
const initializeEngines = require('./ethereum/ap');
const computeSchedule = require('./ethereum/ap');

const init = () => {
  initializeWeb3();
  initializeEngines();
}

module.exports = {
  init: init
};