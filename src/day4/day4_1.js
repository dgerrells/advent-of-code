const PARSE_DATA = /^(?<data>(?:[a-zA-Z]+-)+)(?<sector>[0-9]+)\[(?<checksum>(?<=\[)[a-zA-Z]{5}(?=\]))/gm;
const INVALID_NAME_CHARS = /[^a-zA-Z]*/g;

export const getSectorData = (inputStr) => {
  const dataArray = inputStr.matchAll(PARSE_DATA);
  return [...dataArray].map((match) => ({
    ...match.groups,
    data: match.groups.data.replace(INVALID_NAME_CHARS, ''),
  }));
};

const getChecksum = (info) => {
  const charCounts = info.data.split('').reduce(
    (countMap, char) => ({
      ...countMap,
      [char]: (countMap[char] || 0) + 1,
    }),
    {}
  );

  return Object.keys(charCounts)
    .sort((a, b) => {
      if (charCounts[a] < charCounts[b]) {
        return 1;
      } else if (charCounts[a] > charCounts[b]) {
        return -1;
      }
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      }
      return 0;
    })
    .filter((char, i) => i < info.checksum.length)
    .join('');
};

export const getValidSectors = (inputStr) =>
  getSectorData(inputStr).filter((info) => getChecksum(info) === info.checksum);

export const sumValidSectorsNums = (inputStr) => {
  return getValidSectors(inputStr)
    .map((info) => Number.parseInt(info.sector))
    .reduce((sectorSum, sector) => sectorSum + sector, 0);
};
