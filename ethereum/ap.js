import { web3 } from './web3';
import IEngineArtifact from 'actus-solidity/artifacts/IEngine.json';
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

export async function initializeEngines () {
  engines.pamEngine = new web3.eth.Contract(
    IEngineArtifact.abi,
    '0x8071beF6f7Ce023816Eba322428E46F22A41A5D5'
  );
}

export function areEnginesInitialized () {
  if (engines.pamEngine === null) { 
    throw('WEB3_ERROR: Contracts are not initialized!');
  }
}

export async function computeSchedule (terms) {
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

export function parseEventType (eventTypeIndex) {
  return EVENT_TYPE[eventTypeIndex];
}
