export const processBotInstructions = (str, predicate = () => {}) => {
  const graphData = {};
  const botKeys = [];
  str
    .split('\n')
    .filter((line) => {
      if (line.startsWith('value')) {
        return true;
      }
      processBotCommand(line, graphData, botKeys);
      return false;
    })
    .map((line) => {
      processValLine(line, graphData);
    });

  let toTraverse = [...botKeys].filter(
    (key) => (graphData[key] || []).length === 2
  );
  while (toTraverse.length > 0) {
    toTraverse.forEach((key) => {
      const botData = graphData[key];
      const lowVal = Math.min(...botData);
      const highVal = Math.max(...botData);
      predicate(key, lowVal, highVal, graphData);
      const lowEdge = graphData[key + 'low'];
      const highEdge = graphData[key + 'high'];
      graphData[lowEdge] = [...(graphData[lowEdge] || []), lowVal];
      graphData[highEdge] = [...(graphData[highEdge] || []), highVal];
      graphData[key] = [];
    });

    toTraverse = [...botKeys].filter(
      (key) => (graphData[key] || []).length > 1
    );
  }

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
  const edge = input.bot;
  graph[edge] = [...(graph[edge] || []), input.value];
};

const BOT_COMMAND_REGEX = /(?<bot>bot [0-9]+)(?: gives low to )(?<low>(bot|output) [0-9]+)(?: and high to )(?<high>(bot|output) [0-9]+)/g;
const processBotCommand = (line, graph, botArray) => {
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
  botArray.push(data.bot);
};
