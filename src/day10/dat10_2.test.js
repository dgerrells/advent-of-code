import test from 'ava';
import { getGraphOutputs } from './day10_2.js';

test('should return correct outputs for example input', (t) => {
  const botInput = [
    'value 5 goes to bot 2',
    'bot 2 gives low to bot 1 and high to bot 0',
    'value 3 goes to bot 1',
    'bot 1 gives low to output 1 and high to bot 0',
    'bot 0 gives low to output 2 and high to output 0',
    'value 2 goes to bot 2',
  ].join('\n');

  const graphData = getGraphOutputs(botInput);
  t.deepEqual(graphData['output 1'], [2]);
  t.deepEqual(graphData['output 0'], [5]);
  t.deepEqual(graphData['output 2'], [3]);
});

test('should return empty object if no outputs in input', (t) => {
  const botInput = [
    'value 5 goes to bot 2',
    'bot 2 gives low to bot 1 and high to bot 0',
    'value 3 goes to bot 1',
    'bot 1 gives low to bot 12 and high to bot 32',
    'bot 0 gives low to bot 2 and high to bot 0',
    'value 2 goes to bot 2',
  ].join('\n');

  const graphData = getGraphOutputs(botInput);
  t.deepEqual(graphData, {});
});

// when I think of testing the output here I have some possible ways of creating data
/**
 * Start by creating a value goes to bot step and than create a command for the bot we gave the value to
 * Now, we could move to output or bot. If there is a bot from the above command, we create its command next.
 * On each set, we randomly push to an output on the high, low, or both.
 * As we do each step be increment the current bot count and output count by 1.
 * This should make sure we follow the correct rules.
 * Once, all our bots have lead to an output. We can start back at the top with adding a value.
 * This obv has a pattern to it but after we do this we should be able to than reorder the lines
 * any way and get the same result.
 * Maybe if I have more time I will try creating some generative tests here.
 */

test('should return correct output for shuffled example', (t) => {
  const botInput = shuffle([
    'value 5 goes to bot 2',
    'bot 2 gives low to bot 1 and high to bot 0',
    'value 3 goes to bot 1',
    'bot 1 gives low to output 1 and high to bot 0',
    'bot 0 gives low to output 2 and high to output 0',
    'value 2 goes to bot 2',
  ]).join('\n');

  const graphData = getGraphOutputs(botInput);
  t.deepEqual(graphData['output 1'], [2]);
  t.deepEqual(graphData['output 0'], [5]);
  t.deepEqual(graphData['output 2'], [3]);
});

const shuffle = (input) => {
  const shuff = [...input];

  for (let i = shuff.length - 1; i >= 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    let itemAtIndex = shuff[randomIndex];

    shuff[randomIndex] = shuff[i];
    shuff[i] = itemAtIndex;
  }
  return shuff;
};
