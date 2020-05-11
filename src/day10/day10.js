import { promises as fs } from 'fs';
import path from 'path';
import { processBotInstructions } from './day10_1.js';
import { getGraphOutputs } from './day10_2.js';
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

export const startDay10 = async () => {
  const defaultFile = 'src/day10/input.txt';
  const inputString = await readInput(defaultFile);
  processBotInstructions(inputString, (bot, low, high) => {
    // console.log(bot, low, high);
    if (low === 17 && high === 61) {
      console.log(`Answer for day 10 part 1: ${bot}`);
    }
  });
  const graph = getGraphOutputs(inputString);
  console.log(
    `Answer for day 10 part 2: ${
      graph['output 0'][0] * graph['output 1'][0] * graph['output 2'][0]
    }`
  );
};
