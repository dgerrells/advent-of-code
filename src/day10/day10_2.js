import { processBotInstructions } from './day10_1.js';

export const getGraphOutputs = (str, predicate) => {
  const graph = processBotInstructions(str, predicate);
  return Object.keys(graph)
    .filter((key) => key.includes('output'))
    .reduce((map, key) => ({ ...map, [key]: graph[key] }), {});
};
