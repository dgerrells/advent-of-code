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

export const startDay10 = async () => {
  const defaultFile = 'src/day10/input.txt';
  const inputString = await readInput(defaultFile);
  processBotInstructions(inputString, (bot, low, high) => {
    // console.log(bot, low, high);
    if (low === 17 && high === 61) {
      console.log(`Answer for day 10 part 1: ${bot}`);
    }
  });
  // console.log(`Answer for day 1 part 2: ${calcDupFunc(inputString)}`);
};

// bot 0 []
//   low -> bot 1
//   high -> bot 2
// bot 1 []
//   low -> out 0
//   high -> output 3
// bot 2 []
//   low -> out 2
//   high -> out 3
// out 0 [5]
// out 1 [61]
// out 2 [17]
// out 3 [61]
