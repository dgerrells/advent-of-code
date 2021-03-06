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
  let botThatCompared5and2 = false;
  const predicate = (bot, lowVal, highVal, graphState) => {
    if (highVal === 5 && lowVal === 2) {
      botThatCompared5and2 = bot;
    }
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
  t.deepEqual(
    botThatCompared5and2,
    'bot 2',
    'should have called predicate with bot 2 for compare'
  );
});

test('should throw error on empty input', (t) => {
  let botThatCompared5and2 = false;
  const predicate = (bot, lowVal, highVal, graphState) => {
    if (highVal === 61 && lowVal === 17) {
      botThatCompared5and2 = bot;
    }
  };
  let graphData, error;
  try {
    graphData = processBotInstructions('', predicate);
  } catch (e) {
    error = e;
  }
  t.truthy(error);
  t.falsy(graphData);
  t.false(
    botThatCompared5and2 === 'bot 2',
    'should not have called predicate with bot 2 for compare'
  );
});

test('should throw error on duplicate command input', (t) => {
  let botThatCompared5and2 = false;
  const predicate = (bot, lowVal, highVal, graphState) => {
    if (highVal === 61 && lowVal === 17) {
      botThatCompared5and2 = bot;
    }
  };
  const botInput = [
    'bot 1 gives low to output 0 and high to output 1',
    'value 17 goes to bot 0',
    'value 61 goes to bot 1',
    'value 5 goes to bot 0',
    'bot 0 gives low to bot 1 and high to bot 2',
    'bot 0 gives low to bot 1 and high to bot 2',
    'bot 0 gives low to bot 1 and high to bot 2',
    'bot 0 gives low to bot 1 and high to bot 2',
    'bot 0 gives low to bot 1 and high to bot 2',
    'bot 0 gives low to bot 1 and high to bot 2',
    'bot 0 gives low to bot 1 and high to bot 2',
    'value 61 goes to bot 2',
    'bot 2 gives low to output 2 and high to output 3',
  ].join('\n');
  let graphData, error;
  try {
    graphData = processBotInstructions(botInput, predicate);
  } catch (e) {
    error = e;
  }
  t.truthy(error);
  t.falsy(graphData);
  t.false(
    botThatCompared5and2 === 'bot 2',
    'should not have called predicate with bot 2 for compare'
  );
});

test('should throw error on duplicate value add command', (t) => {
  const botInput = [
    'bot 1 gives low to output 0 and high to output 1',
    'value 61 goes to bot 1',
    'value 5 goes to bot 0',
    'value 5 goes to bot 0',
    'value 5 goes to bot 0',
    'value 5 goes to bot 0',
    'value 5 goes to bot 0',
    'value 5 goes to bot 0',
    'bot 0 gives low to bot 1 and high to bot 2',
    'value 61 goes to bot 2',
    'bot 2 gives low to output 2 and high to output 3',
  ].join('\n');
  let graphData, error;
  try {
    graphData = processBotInstructions(botInput);
  } catch (e) {
    error = e;
  }
  t.falsy(error);
  t.truthy(graphData);
  t.true(
    graphData['bot 0'].length === 6,
    'we should have a bot with all the duplicate values'
  );
});

test('should return correct input end state for ordered input', (t) => {
  let botThatCompared5and2 = false;
  const predicate = (bot, lowVal, highVal, graphState) => {
    if (highVal === 61 && lowVal === 17) {
      botThatCompared5and2 = bot;
    }
  };
  const botInput = [
    'value 5 goes to bot 0',
    'value 17 goes to bot 0',
    'value 61 goes to bot 1',
    'value 61 goes to bot 2',
    'bot 0 gives low to bot 1 and high to bot 2',
    'bot 1 gives low to output 0 and high to output 1',
    'bot 2 gives low to output 2 and high to output 3',
  ].join('\n');

  const graphData = processBotInstructions(botInput, predicate);
  t.deepEqual(graphData['output 1'], [61]);
  t.deepEqual(graphData['output 0'], [5]);
  t.deepEqual(graphData['output 2'], [17]);
  t.deepEqual(
    botThatCompared5and2,
    'bot 2',
    'should have called predicate with bot 2 for compare'
  );
});
