import { getValidSectors } from './day4_1.js';

const findHiddenSectorInfo = (inputStr, toFind) =>
  getValidSectors(inputStr).filter((info) =>
    info.data
      .split('')
      .map((char) =>
        String.fromCharCode(
          ((char.charCodeAt(0) - 97 + Number.parseInt(info.sector)) % 26) + 97
        )
      )
      .join('')
      .includes(toFind)
  )[0];

export const findHiddenSectorNumber = (inputStr, toFind) => {
  const info = findHiddenSectorInfo(inputStr, toFind);
  return info ? info.sector : false;
};
