import test from 'ava';
import { fillX, fillY, calcDup, calcDupFunc, traverse } from './day1_2.js';

test('traverse should be pure', (t) => {
  const expectDist = 7;
  const takenSteps = [];
  const steps = ['R100', 'L2', 'L99', 'L8'];
  const result = traverse(steps, 0, 0, 'N', takenSteps);
  t.true(steps.length === 4, 'should not have changed input step array');
  t.true(
    takenSteps.length === 0,
    'should not have changed input taken step array'
  );
  t.deepEqual(result, expectDist);
});

test('check exmaple input 2 blocks away no duplicate', (t) => {
  const input = 'R2, R2, R2';
  const expectDist = 2;
  t.true(calcDup(input) === expectDist);
});

test('check exmaple input 2 blocks away no duplicate functional', (t) => {
  const input = 'R2, R2, R2';
  const expectDist = 2;
  t.true(calcDup(input) === expectDist);
});

test('check duplicate repeat at start func', (t) => {
  const input = 'R8, R8, R8, R8, R8, R8';
  const expectDist = 0;
  t.deepEqual(calcDupFunc(input), expectDist);
});

test('check duplicate repeat at start', (t) => {
  const input = 'R8, R8, R8, R8, R8, R8';
  const expectDist = 0;
  t.true(calcDup(input) === expectDist);
});

test('check duplicate repeat empty input func', (t) => {
  const input = '';
  const expectDist = 0;
  t.deepEqual(calcDupFunc(input), expectDist);
});

test('check duplicate repeat empty input', (t) => {
  const input = '';
  const expectDist = 0;
  t.true(calcDup(input) === expectDist);
});

test('fillX negative start', (t) => {
  const traversed = fillX(-10, 32, 0);
  t.true(traversed.has('8,0'), [...traversed].join());
});

test('fillX zero start', (t) => {
  const traversed = fillX(0, 12, 1);
  t.true(traversed.has('8,1'), [...traversed].join());
});

test('fillX zero start end', (t) => {
  const traversed = fillX(0, 0, 0);
  t.false(traversed.has('8,0'), [...traversed].join());
});

test('fillY zero start end', (t) => {
  const traversed = fillY(0, 0, 0);
  t.true(traversed.has('0,0'), [...traversed].join());
});

test('fillY negative start end', (t) => {
  const traversed = fillY(-12, 20, 0);
  t.true(traversed.has('0,-8'), [...traversed].join());
});
