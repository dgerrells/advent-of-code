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

Now, the lazy way of giving predicate support for this is to bring my helper functions into the scope of the caller which will have the optional predicate we can run. This just saves me one arg to keep track of during the run. I am going to try and keep it a bit cleaner by just passing the predicate as a func.

One thing to note is that I am going to remove the need to terminate when our predicate returns true. Sure this would speed things up but I'd rather have the option of having many predicates we could run on dif steps.

### A Bad Assumption

So I had an incorrect assumption on how this worked. I thought that we did not need to process all value inputs first before we can start following the graph...turns out, we did. What this meant is that my fun little recursive add value is nuked. I looked over what I had and found that I basically could reuse most of my work and instead add a part to reduce a list of bots that have 2 values. We terminate when this is reduced to an empty array.

1. Build graph structure from commands
2. Store value get commands
3. while there are bots with more than 2 chips
   1. send low to low edge and high to high edge
   2. run predicate (optional)
4. Done

I refactored and did this and it worked. Well my single test case passed. I try again having previously failed for submitting my solution and I see the little gold star. Awesome! As I look at this I can tell there are improvements that can be done and I do not like the test coverage I ended up with. My solution doesn't have a define correct function for inputs that have odd structures like adding 100 values to one bot. I am ok with this for now.

Clean up some code and commit. Off to part 2.

## Part 2

Ok this one is a give me. We just look at the graph data outputs and return that. I could just reuse the same func but I wrote a small wrapper that just returns the outputs as a map.

Wrote an example tests against this and it worked. Checked my answer with input and it passed. Another star! Yes! Winnnniiiing

For real though, I went back to looking at writing some better tests for this. I came up with an idea but I will have to come back to it. I added my idea as a comment in the test file.

I noticed that my main file does not have any error handling so I updated that.

I am kinda ok right now but will sleep on it and come back later.

Commit :)

## Final Thoughts

Ok, I again had an issue with a bad assumption on how the problem worked which again made me have to rework but rework and not restart completely. Also, after I wrote down my assumptions and idea first, I implemented it much quicker and without issues. I did get the incorrect solution working without error and kinda correct fast. Now, I did have to go back and redo some work which took time and digging into the problem more but this I think is a marked improvement over the previous day.

My next idea is to double down. I want to not only well layout my assumptions and idea but before I implement them, validate that certain edge cases are handled.

Also, generative testing sounds like a really fun way of maybe trying edge cases. I think it would have given been better to start with writing some test cases built with a generative testing lib well before thinking about the solution even! This will make sure I have a strong understanding of the domain and how things are working before I try to solve anything.

Awesome. Hopefully, I can apply some of this in the future. Maybe I can come back and revisit some of the testing here.
