import test from 'ava';
import { findHiddenSectorNumber } from './day4_2.js';

test('should find hidden when rotating over 26', (t) => {
  const secNum = `${300 * 26}`;
  const sectorData = [
    `g-f-e-b-d-c-a-${secNum - 100}[abcde]`,
    `a-b-c-d-e-f-g-${secNum}[abcde]`,
    `g-f-e-b-d-c-a-${secNum + 1}[abcde]`,
  ].join('\n');

  const sectorNumber = findHiddenSectorNumber(sectorData, 'abcde');
  t.deepEqual(sectorNumber, secNum);
});

test('should not find hidden when there is no match', (t) => {
  const secNum = `${300 * 26}`;
  const sectorData = [
    `g-f-e-b-d-c-a-${secNum - 100}[abcde]`,
    `a-b-c-d-e-f-g-${secNum - 14}[abcde]`,
    `g-f-e-b-d-c-a-${secNum + 1}[abcde]`,
  ].join('\n');

  const sectorNumber = findHiddenSectorNumber(sectorData, 'abcde');
  t.deepEqual(sectorNumber, false);
});

test('should find hidden when rotating by 1', (t) => {
  const secNum = `${1}`;
  const sectorData = [
    `g-f-e-b-d-c-a-${secNum + 10}[abcde]`,
    `a-b-c-d-e-f-g-${secNum}[abcde]`,
    `g-f-e-b-d-c-a-${secNum + 1}[abcde]`,
  ].join('\n');

  const sectorNumber = findHiddenSectorNumber(sectorData, 'bcdef');
  t.deepEqual(sectorNumber, secNum);
});
