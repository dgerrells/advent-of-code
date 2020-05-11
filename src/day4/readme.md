# Advent of Code 2016

> Day 4: Security Through Obscurity

Ok, this one didn't look too bad. Instructions rather clear. First thought was to calc the correct code from the text. The idea was to pull out the list of words and store a map of `count => [chars]` like `{ 10 : ['a', 'g'], 9: ['c']}` etc. We'd then be able to go to the highest count and just sorted the list of chars with the same count giving us the correct checksum. We can than compare the checksum at the end to see if it is valid. This would work but is a bit complicated.

So second guess was to start with our checksum and see if it is correct for our input. We still store a map of character counts but this time we go through our checksum characters and make sure they have decreasing counts with ties broken but the character value being less then the previous value.

Cool, this sounds a bit easier.

1. Pull encrypted name, checksum, and sector # from input
2. Build map of character counts for the encrypted name
3. iterate over our checksum making sure that the count for each char is decreasing
4. On a tie, the same char count, we then check that the char value is increasing (alphabetical goes up).
5. If we get to the end without any issues, we are valid and can return our sector number.

As I thought about this more I think I could maybe do the whole thing with one regex. Do a look ahead at the sector number using a named look ahead for each of the 5 characters in the checksum. We can than use these in a lookbehind to make sure they all are contained in the encrypted name. Only thing I cannot figure out is making sure the counts are in decreasing order. I could just use a capture group for each of the named lookaheads and than check those counts but that still leaves me with handling ties.

I may come back to this after the earlier approach is done.

## Part 1 First implementation

I am starting out with parsing the data with a regex. I figured this would be fun. I ended up spending a bit of time putting together a regex that can parse an entire file into an array ob objects containing the named capture groups.

Only step not done in the regex is removing any non-character digit in the encrypted name such as '-'. We could detect the case where there is something other than '-' like '3' and throw the input out. I like keeping it as this way down the road we could add support for numbers or other characters in the encrypted name.

Add some tests. Ok, looking good and commit.

Found some errors in parsing regex and cleaned them up. We now will only parse correct valid input and only need to replace the dashes from our data capture group. So, we have three capture groups `data`, `sector`, and `checksum`. If any of those does not have the correct format, we throw the line out. Nice!

Again, update test cases.

### Oh boi!

I come back from trying out the solution and well the approach above wasn't working very well at all. I didn't take into account a character not in the checksum that had a higher count. So I went back to the drawing board and make it stupid simple. This time, we are going to create the correct checksum from the name instead of the other way.

1. create map of counts for all characters in the name (S (26) or S(u) where u is number of unique characters in input)
2. sort the keys of the map by value in map and then by character O(n log n)
3. join first 5 entries in list
4. Compare correct checksum with given checksum.

This got me the right answer and part 2. I am not happy with the test coverage and I want to dig into a way of creating test data after reading part two but I don't have as much time. Instead I will add what tests I can and move on to part 2.

## Part 2 First go

So part two took some time for me to understand what I needed to do. I got what the steps are for rotating the characters based on the number but had no idea what in the world I was suppose to compare the rotated name to. I ended up just guessing that it was 'north pole' or something. D:

First thing is to split up the filtering in first solution to give me a list of valid sector infos. Refactored and old tests still worked. Woot!

Nice, now with that the idea is to pipe this into a function for part two that will rotate each char based on sector number. I think I can use some module 26 or something to rotate. Once that is done, I am going to see if it has our magic word 'north pole'.

Right, lets get to it.

### Not too hard

Ok so I did have to look up how to turn a javascript string to char code. We end up having to `-97` to get it in the range of a-z which means to convert back we add `+97`.

Steps:

1. Get char code
2. convert to a-z range by - 97
3. add sector number
4. mod 26 to get rotated char
5. add 97 back
6. convert to char
7. Profit

Many steps but this ended up just being `String.fromCharCode((({letter}.charCodeAt(0) - 97 + {sector number}) % 26) + 97)`. I found that this gave the right solution but I am missing some test coverage. I do like the simplicity of this function but there could be an improvement by using a for loop and exiting early but this doesn't use for loops which is fun.

Ok, commit and than off to write some tests.

Wrote a few tests and then looked into generative testing...oh boi it is interesting. I want to use [ava-check](https://github.com/leebyron/testcheck-js/tree/master/integrations/ava-check) a plugin for the test runner we use that gives us acess to [testcheck](https://github.com/leebyron/testcheck-js) which is a dope generative testing framework.

See, the first part of this problem is kinda like a sort so one of the properties we could test is that processing the encrypted name twice should be the same as processing it once. Same with the checksum. We could also have a property where if a number > 0 is returned, it should be the same as the sector number as the only time we don't get 0 is if the sector number is valid.

There are other ideas I have but due to time constrains I am going to move on and maybe come back to this.
