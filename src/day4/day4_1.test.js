import test from 'ava';
import { getSectorData } from './day4_1.js';

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
  ];

  const dataArray = getSectorData(sectorData.join('\n'));
  t.true(dataArray.length === 0, 'should have no matches');
});

test('should remove any numbers in encrypted name', (t) => {
  // there is the case where numbers or characters are added to
  const sectorData = ['321-df-34-1234[rtete]'];

  const dataArray = getSectorData(sectorData.join('\n'));
  t.true(dataArray.length === 1, 'should have one match');
  t.deepEqual(dataArray[0].data, 'df');
});
