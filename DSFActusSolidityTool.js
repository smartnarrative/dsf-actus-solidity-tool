import { initializeWeb3 } from './ethereum/web3';
import { initializeEngines, computeSchedule } from './ethereum/ap';
import BulletLoanQuarterlyTerms from './PAM-1y-bullet-loan-quarterly-coupon.json';

initializeWeb3();
initializeEngines();

export const init = async () => {
  const terms = JSON.stringify(BulletLoanQuarterlyTerms);
  const schedule = await computeSchedule(JSON.parse(terms));
  // console.dir(schedule);
  return schedule;
}
