import readline from 'readline';
import { startDay1 } from './day1/day1.js';
import { startDay4 } from './day4/day4.js';

const validProblems = new Set(['1', '4', '10']);

const syncPromp = (promp, rl) => {
  return new Promise((resolve, reject) => {
    rl.question(promp, (ans) => {
      resolve(ans, reject);
    });
  });
};

const startAdvent = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  //welcome!
  console.log('Welcome to Advent of code!');

  //What did you want to run?
  let probNum = await syncPromp(
    'Please enter a problem number, 1, 4, or 10 to run: ',
    rl
  );
  while (!validProblems.has(probNum)) {
    console.log('Opps, that is not a valid problem number.');
    probNum = await syncPromp(
      'Please enter a problem number, 1, 4, or 10 to run: ',
      rl
    );
  }

  if (probNum === '1') {
    await startDay1();
  } else if (probNum === '4') {
    await startDay4();
  }

  rl.close();
  process.exit();
};

startAdvent();
