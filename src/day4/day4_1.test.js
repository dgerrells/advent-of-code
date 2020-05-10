import test from 'ava';
import { getSectorNumber } from './day4_1.js';

test('traverse should be pure', (t) => {
  const expectSecNum = 123;
  const sectorData = 'aaaaa-bbb-z-y-x-123[abxyz]';
  t.deepEqual(getSectorNumber(sectorData), expectSecNum);
});
