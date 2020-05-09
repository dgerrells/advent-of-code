import test from 'ava';
import { calcDist, calcDistFunc, inputDelimiter } from './day1_1.js';

test('check exmaple input 5 blocks away', (t) => {
  const input = 'R2, L3';
  const expectDist = 5;
  t.true(calcDist(input) === expectDist);
  t.true(calcDistFunc(input) === expectDist);
});

test('check exmaple input 2 blocks away', (t) => {
  const input = 'R2, R2, R2';
  const expectDist = 2;
  t.true(calcDist(input) === expectDist);
  t.true(calcDistFunc(input) === expectDist);
});

test('check empty string input', (t) => {
  t.true(calcDist('') === 0, 'func did not return 0');
  t.true(calcDistFunc('') === 0, 'recursive func did not return 0');
});

test('check no input', (t) => {
  t.true(calcDist() === 0), 'func did not return 0';
  t.true(calcDistFunc() === 0, 'recursive func did not return 0');
});

test('large input', (t) => {
  const [inputString, solution] = genLargeCircleInput(20, 4000);

  t.deepEqual(
    calcDist(inputString),
    solution,
    `large input should have returned ${solution}`
  );
  t.deepEqual(
    calcDistFunc(inputString),
    solution,
    `recursive version for large input should have returned ${solution}`
  );
});

const genLargeCircleInput = (stepSize = 5, count = 100, dir = 'R') => {
  const listSteps = [];
  const circleMap = {
    1: 1,
    2: 2,
    3: 1,
    0: 0,
  };
  let solution = circleMap[count % 4] * stepSize;

  while (count > 0) {
    listSteps.push(dir + stepSize);
    count--;
  }
  return [listSteps.join(inputDelimiter), solution];
};
