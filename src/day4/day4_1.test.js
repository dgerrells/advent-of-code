import test from 'ava';
import { getSectorData, sumValidSectorsNums } from './day4_1.js';

test('should not sum single sector with missing count char in checksum', (t) => {
  const sectorData = 'a-b-c-dhhh-e-f-g-hhhh-987[abcde]';
  const validSector = sumValidSectorsNums(sectorData);
  t.deepEqual(validSector, 0);
});

test('should sum valid single sector with ties', (t) => {
  const sectorData = 'a-b-c-d-e-f-g-h-987[abcde]';
  const validSector = sumValidSectorsNums(sectorData);
  t.deepEqual(validSector, 987);
});

test('should sum valid single sector', (t) => {
  const sectorData = 'not-a-real-room-404[oarel]';
  const validSector = sumValidSectorsNums(sectorData);
  t.deepEqual(validSector, 404);
});

test('should sum only valid sectors', (t) => {
  const sectorDataArray = [
    'abcde-116[abcde]',
    'aaaaaaaaaa-bbbbb-ccccccccc-ddd-ee-q-973[acbde]',
    'wbhsfbohwcboz-foppwh-qighcasf-gbbbbbsfjwqs-480[fhswb]',
    'i-is-bad-sector-qs-480[fhswb]',
  ];
  const validSectorNumber = sumValidSectorsNums(sectorDataArray.join('\n'));
  t.deepEqual(validSectorNumber, 116 + 973);
});

test('should parse sector data from string', (t) => {
  const expectedData = {
    checksum: 'abxyz',
    data: 'aaaaabbbzyx',
    sector: '123',
  };

  const sectorData = 'aaaaa-bbb-z-y-x-123[abxyz]';
  const dataArray = getSectorData(sectorData);
  t.true(dataArray.length === 1, 'should find 1 match');
  t.deepEqual(dataArray[0], expectedData);
});

test('should parse multiple sector data from input string', (t) => {
  const arraySize = 100;
  const sectorDataObj = {
    checksum: 'qrazx',
    data: 'wifilzofwbiwifunyyhachyylcha',
    sector: '526',
  };
  const expectData = Array.from(new Array(arraySize).fill(0), () => ({
    ...sectorDataObj,
  }));
  const sectorData = 'wifilzof-wbiwifuny-yhachyylcha-526[qrazx]';
  const inputString = new Array(arraySize).fill(sectorData).join('\n');

  const dataArray = getSectorData(inputString);
  t.true(dataArray.length === arraySize, 'should find all matches');
  t.deepEqual(dataArray, expectData);
});

test('should return empty with unmatched input sector data', (t) => {
  const sectorData = [
    'I am the bad string :( no sector gere',
    'i-am-still-bad[cause]',
    '3213-123-3-23[12345]',
    'asd[abcd4]',
    '--still-123[cause]',
    '321-df-34-1234[rtete]',
    'aaaaa-bbb-z-y-x--123[abxyz]',
    'aaa1aa-bbb-z-y-x-123[abxyz]',
    'aaa$aa-bbb-z-y-x-123[abxyz]',
  ];

  const dataArray = getSectorData(sectorData.join('\n'));
  t.deepEqual(dataArray.length, 0, 'should have no matches');
});
