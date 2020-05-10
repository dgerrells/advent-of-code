import { promises as fs } from 'fs';
import path from 'path';

/**
 * This just loads a file and catches an error. We read it all into memory. No streaming here, yet.
 * If there was an error, null is returned.
 * @param {string} file
 */
export const readInput = async (file) => {
  const __dirname = path.resolve();
  try {
    return await fs.readFile(path.join(__dirname, file), 'utf8');
  } catch (exception) {
    console.error(exception);
    return null;
  }
};

export const startDay4 = async () => {
  const defaultFile = 'src/day4/input.txt';
  const inputString = await readInput(defaultFile);
  // console.log(`Answer for day 4 part 1: ${calcDistFunc(inputString)}`);
  // console.log(`Answer for day 4 part 2: ${calcDupFunc(inputString)}`);
};
