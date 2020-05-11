export const processBotInstructions = (str) => {
  const graphData = {};
  const commands = str
    .split('\n')
    .filter((line) => {
      if (line.startsWith('value')) {
        return true;
      }
      addBotCommand(line, graphData);
      return false;
    })
    .map((line) => {
      processValLine(line, graphData);
    });

  return graphData;
};

const VAL_COMMAND_REGEX = /value (?<value>[0-9]+) goes to (?<bot>bot [0-9]+)/g;
const processValLine = (line, graph) => {
  const input = [...line.matchAll(VAL_COMMAND_REGEX)].map((match) => ({
    ...match.groups,
  }))[0];

  if (!input) {
    throw `Failed to parse value input for line: ${line}`;
  }

  addValueToGraph(input.bot, Number.parseInt(input.value), graph);
};

const addValueToGraph = (edge, value, graph) => {
  graph[edge] = [...(graph[edge] || []), value];

  if (edge.includes('output')) {
    // we terminate at an output
    return;
  }

  const botData = graph[edge];
  if (botData.length > 2) {
    throw `Bot ${edge} found with more than 2 values: ${botData}`;
  }
  if (botData.length === 1) {
    return; // still ok
  }

  // ok more than two, time to start the fan
  const lowVal = Math.min(...botData);
  const lowEdge = graph[edge + 'low'];
  if (!lowEdge) {
    throw `Bot ${edge} did not have low edge in graph.`;
  }
  addValueToGraph(lowEdge, lowVal, graph);

  const highVal = Math.max(...botData);
  const highEdge = graph[edge + 'high'];
  if (!highEdge) {
    throw `Bot ${edge} did not have high edge in graph`;
  }
  addValueToGraph(highEdge, highVal, graph);

  graph[edge] = []; // we are done
};

const BOT_COMMAND_REGEX = /(?<bot>bot [0-9]+)(?: gives low to )(?<low>(bot|output) [0-9]+)(?: and high to )(?<high>(bot|output) [0-9]+)/g;
const addBotCommand = (line, graph) => {
  const data = [...line.matchAll(BOT_COMMAND_REGEX)].map((match) => ({
    ...match.groups,
  }))[0];
  if (!data) {
    throw `Failed to parse data from line: ${line}`;
  }
  if (graph[data.bot + 'high'] || graph[data.bot + 'low']) {
    throw `Found duplicate command for ${data.bot} input -> ${line}`;
  }
  graph[data.bot + 'low'] = data.low;
  graph[data.bot + 'high'] = data.high;
};
