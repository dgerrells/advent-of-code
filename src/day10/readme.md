# Advent of Code 2016

> Day 10: Balance Bots

It took me a bit to really get what was going on here. I kinda got the gist of it but I was confused on how the file should be interpreted and what assumptions we can make. From what I can tell,

1. A bot will only have two values
2. A bot will only have one rule/command for how it moves the low/high value
3. A bot will only run a command if it has two values
4. An output is a terminal state that can have more than one value

Ok, I think if we assume the above, than this starts to look like a nice graph problem. Each bot is a node where it has two edges `high` and `low` which got to another bot or node. They can also go to an output. A bot also has an edge to the values it has in say an array for now. Now when we need to add a value to a bot, we simply look it up by name as a node, than we add the value to the bots data. If we have two values, than we take the high and pass it to the `high` edge for the bot and the same for `low`. As we pass this to the next node, we do the same if it has two values.

Now we are adding the assumption that there will not be a cycle in the graph for now.

## Example

Example data before processing the last value to bot 2.

```javascript
const edges: {
    'bot 2': [5,2], // oh boi we better send these off
    'bot 2high': 'bot 0',
    'bot 2low': 'bot 1',
    'bot 1': [3],
    'bot 1low': 'output 1',
    'bot 1high': 'bot 0',
    'bot 0low': 'output 2',
    'bot 0high': 'output 0',
}
```

Now when we process something that gives a bot two values, we kick off the cascade until no more bots have two values.

Next step

```javascript
const edges: {
    'bot 2': [],
    'bot 2high': 'bot 0',
    'bot 2low': 'bot 1',
    'bot 1': [3, 2], // ok we now have two
    'bot 1low': 'output 1',
    'bot 1high': 'bot 0',
    'bot 0': [5],
    'bot 0low': 'output 2',
    'bot 0high': 'output 0',
}
```

Next

```javascript
const edges: {
    'bot 2': [],
    'bot 2high': 'bot 0',
    'bot 2low': 'bot 1',
    'bot 1': [], // empty
    'bot 1low': 'output 1',
    'bot 1high': 'bot 0',
    'bot 0': [5, 3], // my turn
    'bot 0low': 'output 2',
    'bot 0high': 'output 0',
    'output 1': [2],
}
```

Finally

```javascript
const edges: {
    'bot 2': [],
    'bot 2high': 'bot 0',
    'bot 2low': 'bot 1',
    'bot 1': [], // empty
    'bot 1low': 'output 1',
    'bot 1high': 'bot 0',
    'bot 0': [], // my turn
    'bot 0low': 'output 2',
    'bot 0high': 'output 0',
    'output 1': [2],
    'output 0': [5],
    'output 2': [3]
}
```

Awesome! We can split up this into say a bot map and an output map or something similar.

## Now what?

Ok, now how will we know which bot compares a given value? We can have an optional lambda that we run before each bot compares two values. If it returns true, we stop processing, otherwise we continue. This will let us pass a function to check when and if a bot ever compares two specific values. Cool, that should give us that part.

I still am unsure of some things. For example, could we process everything other than the adding the values to build our graph, than we can add the values until we have none left. I think this should work.

Another note is that we can create the nodes as needed when we are processing. That is to say we don't need to have a `bot 0` in our graph even if an edge from `bot 10` points to it.

Ok, lets try this idea out. First write a basic unit test :D

I can see some generative testing potential here which we may revisit later.

## Implementation

I got to implementing everything and so far so good. First little test is being passed without the lambda part. I have not put in running an optional lambda yet but am going to commit with the first set of tests passing.
