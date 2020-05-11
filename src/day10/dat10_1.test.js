import test from 'ava';
import { processBotInstructions } from './day10_1.js';

// some ideas for properties
/**
 * We could return the graph state when we are done processing input
 * which we can than validate certain properties of such as having an output set etc.
 * Notes for later.
 * We could also check that a given end state of outputs are correct.
 * Maybe that the output of processing should be the same regardless of the number of times run.
 */

test('should return correct example input end state', (t) => {
  const predicate = (bot, highVal, lowVal, graphState) => {
    if (highVal === 5 && lowVal === 2) {
      t.deepEqual(bot, 'bot 2', 'bot two should compare 5 and 2');
    }
    return true; // just keep going for now
  };
  const botInput = [
    'value 5 goes to bot 2',
    'bot 2 gives low to bot 1 and high to bot 0',
    'value 3 goes to bot 1',
    'bot 1 gives low to output 1 and high to bot 0',
    'bot 0 gives low to output 2 and high to output 0',
    'value 2 goes to bot 2',
  ].join('\n');

  const graphData = processBotInstructions(botInput, predicate);
  t.deepEqual(graphData['output 1'], [2]);
  t.deepEqual(graphData['output 0'], [5]);
  t.deepEqual(graphData['output 2'], [3]);
});
