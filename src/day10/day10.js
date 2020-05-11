import { promises as fs } from 'fs';
import path from 'path';
import { processBotInstructions } from './day10_1.js';
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

export const startDay1 = async () => {
  const defaultFile = 'src/day10/input.txt';
  const inputString = await readInput(defaultFile);
  console.log(
    `Answer for day 10 part 1: ${processBotInstructions(inputString)}`
  );
  // console.log(`Answer for day 1 part 2: ${calcDupFunc(inputString)}`);
};
