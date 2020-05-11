import readline from 'readline';
import { startDay1 } from './day1/day1.js';
import { startDay4 } from './day4/day4.js';
import { startDay10 } from './day10/day10.js';

const validProblems = new Set(['1', '4', '10']);

const syncPromp = (promp, rl) => {
  return new Promise((resolve, reject) => {
    rl.question(promp, (ans) => {
      resolve(ans, reject);
    });
  });
};

const probMap = {
  '1': startDay1,
  '4': startDay4,
  '10': startDay10,
};

const startAdvent = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  //welcome!
  console.log('Welcome to Advent of code!');

  while (true) {
    const probNum = await awaitValidInput(
      `Please enter a problem number, (${Object.keys(
        probMap
      ).join()}) to run: `,
      Object.keys(probMap),
      rl,
      'Opps, that is not a valid problem number.'
    );

    if (probMap[probNum]) {
      await probMap[probNum]();
    }

    const shouldKeepGoing = await awaitValidInput(
      'Would you like to run another problem? (Y|N) ',
      ['y', 'n'],
      rl
    );
    if (shouldKeepGoing === 'n') {
      break;
    }
  }
  rl.close();
  process.exit();
};

const awaitValidInput = async (
  prompt,
  validInput,
  rl,
  badInputMsg = `I am sorry. I cannot do that. I can do: ${validInput.toString()}`
) => {
  if (!validInput || validInput.length === 0) {
    return '';
  }
  let answer = await syncPromp(prompt, rl);
  while (true) {
    if (validInput.includes(answer.toLowerCase())) {
      return answer;
    }
    console.log(badInputMsg);
    answer = await syncPromp(prompt, rl);
  }
};

startAdvent();
