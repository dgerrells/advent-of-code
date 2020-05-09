# Advent of Code 2016

> Day 1: No Time for a Taxicab

Here we go. Ok, I started reading the problem and was totally lost. I kept rereading it and just could not understand what was being asked.

From what I understood, we get an input file that will give us instructions on how to move which will end with the HQ. Than we need to find how far this HQ is from us. I kept getting tripped up on an input file. I just couldn't find where it was.

I finally saw that I needed to log in. I did that and bam, more info with a starting input file. :D

Once I looked at the input file I had a basic idea of what to do.

We start at origin `(0,0)` and move around based on a direction and steps moved. At the end, we just need to check `|x| + |y|` since our start is the same as the origin. Nice. Ok how to implement it.

## Part 1 First implementation

I didn't want to play with webpack to much to keep it simple. I decided to just use a newer version of node that supported es6 and es6 imports. This took way too longer but I did get things setup.

Some of this setup with creating an entry point and structure for each file.

Ok on to the first go. I remembered doing game dev and using vec2 to track movement. This was the first thing I went with. Keep track of a vec2 or a point, and just move in a direction based on the command step from the input file. I spent quite a bit of time trying to come up with a simple solution to tracking direction. I ended up with two maps: one pointing from `{direction (N|S|E|W) + step turn (R|L)}` to `{direction (N|S|E|W)` and another pointing from `{direction (N|S|E|W) to a vec2`. The Vec2 is a unit Vector we can just scale to move in a given direction. This means we do not have to track which value to add based on the current direction.

As you can tell, this is getting overly complicated. I finished it up writing some tests catching a few edge cases but did end with an answer. I submitted it and got the next part. But I wanted to try something a bit more functional or recursive.

## Part 1 Second Implementation

So I wanted to write a function to traverse an input array and return the answer. I want it to be pure, I want it to be tail recursive, and I want it to just take an input of `(stepsArray, x, y, dir)`. I could add another arg to track an index in the steps array but that felt like too much of a for loop. Instead, I pass in an array with one less argument, the one we processed. This is done via slice which is likely slower than just tracking the index as an arg but it felt more functiony. We also, could maybe change the input from an array to an iterator calling .next() which would let us maybe do some piping of a massive file.

I updated some tests with this and felt good about it. I refactored some of the code for both implementations and cleaned up the tests a bit more. I spent a bit of time creating a function to generate test input based on a circle. It was hard trying to come up with a way to generate test data that did not require knowing the answer in advanced. The circle method let me know the answer based on the mod 4 of the number of steps passed in. I added some large input tests using this to generate the input. Nice.

## Part 2 First Implementation

So now we need to find a duplicate step. No problem! Store a set of last input commands and check that before stepping. I created a new file for this solution and quickly added the map and check. I got an answer and well...it was wrong. Hmmm... I was stomped.

### Take 2

I reread the instructions for the second part many times but just couldn't figure out what I was doing wrong. I left for a bit and talked to a friend. I came back and noticed that I was only tracking the end point after each command and NOT every point traversed. So from `(0,0)` to `(10,0)` would only have `[(0,0), (10,0)]` instead of all ten points traversed!

Ok, no problem, just add a step to store each point in a map/set and check that before stepping. I thought about the input and saw that if a step went from say `(0,0)` to `(1000000,0)` we'd be storing WAY too much data. Yes it would be O(1) to check for a duplicate but this could kill memory esp if we wanted to stream a massive file in. What other options were there.

Will I knew there was a line intersection formula and we could store all the points and than check them as lines to find an intersection. This seemed a bit more complicated than needed. I thought about it more and decided of a compromise.

### The Compromise

I would check each line for an intersection but I would do so using a set containing all the points on the line instead of the line formula. This means we only store a set in memory big enough to check just two lines. So our memory would be the largest and second to largest line segment along our path since we'd need enough to check both.

We create a set of all the points along our current line segment. And, we make a set of our possible intersection line's points. We likely could cache/memoize this as we only need to do it once. We than iterate over our possible intersection line's points and check to to see if the other set contains the same point (the one from our list of previous positions).

The idea is to store each position we have after processing a command. So, `[(0,0), (5,0), (5,5)]` for input `R5 L5`. As we process more commands we can check (starting from the beginning) each line constructed from our stored positions minus the last (since it is part of the potential intersection). If we find an intersection, BOOM duplicate found.

One issue I ran into was that we need to maintain order as we build our set of points. A map wouldn't work as we need the order. I added some basic logic to check for parallel lines that skips the intersection step since we know they cannot intersect.

As I was writing helper functions to do different steps, I added unit tests. Once, I had a solution, I added more tests. I wasn't able to come up with a nice way of generating test data so I opted to try edge cases by hand.

## Part 2 Second Implementation

So for the functional version, I took part 1's traverse method and added a `takenSteps` arg to track our list of processed steps. Than I created a function to check for the intersection from our `takenSteps` reusing the intersection method from above as most of that was already functional.

The biggest thing I was not happy with here was that I polluted much of this with the Vec2 class I made. Yes it did help keeping track of points easier but I felt like it wasn't in the spirit.

I added some unit tests and noticed I didn't have any form the earlier one checking if a function is pure! So I added that.

## Final thoughts

I am a bit disappointed in how long it took me to get this done. I think I struggled a bit too much on the second part thinking of the ways to intersect two lines that was NOT the line intersection formula. I still had fun though.
