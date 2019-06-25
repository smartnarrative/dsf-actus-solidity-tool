const web3 = require('./web3');
const IEngineArtifact = require('actus-solidity/artifacts/IEngine.json');
// import Deployments from 'actus-solidity/deployments.json';

const EVENT_TYPE = [
  "SD",
  "MD",
  "AD",
  "IED",
  "IP",
  "PR",
  "PP",
  "PY",
  "FP",
  "PRD",
  "TD",
  "IPCI",
  "RR",
  "RRY",
  "SC",
  "CD",
  "DV",
  "MR",
  "IPCB",
  "STD",
  "Child"
];


const engines = {
  pamEngine: null
};

const initializeEngines = async () => {
  engines.pamEngine = new web3.eth.Contract(
    IEngineArtifact.abi,
    '0x8071beF6f7Ce023816Eba322428E46F22A41A5D5'
  );
}

const areEnginesInitialized = async () => {
  if (engines.pamEngine === null) { 
    throw('WEB3_ERROR: Contracts are not initialized!');
  }
}

const computeSchedule = async (terms) => {
  areEnginesInitialized();

  const initialState = await engines.pamEngine.methods.computeInitialState(terms).call();
  const protoEventSchedule = await engines.pamEngine.methods.computeProtoEventScheduleSegment(
    terms,
    terms.statusDate,
    terms.maturityDate
  ).call();
  
  let state = initialState;
  const evaluatedInitialSchedule = [];
    
  for (let protoEvent of protoEventSchedule) {
    console.log(protoEvent);
    if (protoEvent.scheduleTime === "0") { break; }
    const {0: nextState, 1: event} = await engines.pamEngine.methods.computeNextStateForProtoEvent(
      terms,
      state,
      protoEvent,
      protoEvent.scheduleTime
    ).call();    
    
    state = nextState;
    
    evaluatedInitialSchedule.push({ event, state: nextState });
  }

  return evaluatedInitialSchedule;
}

const parseEventType = (eventTypeIndex) => {
  return EVENT_TYPE[eventTypeIndex];
}

module.exports = {
  initializeEngines: initializeEngines,
  computeSchedule: computeSchedule,
  parseEventType: parseEventType
};