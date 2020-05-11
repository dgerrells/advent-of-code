# Advent of Code 2016

> David Trying Hard

This repo contains my solutions and notes to some of the [Advent of Code 2016](https://adventofcode.com/2016) problems. If you have not tried the Advent of Code 2016, please try them first. It is always more fun to fail, fail, fail, and then win!

## Starting

You will need node version 13^ as this project uses es6 imports. I recommend using [nvm](https://github.com/nvm-sh/nvm).

To get started run

```shell
npm install && npm start
```

or yarn

```shell
yarn && yarn start
```

This will install dependencies and start running the app.

## Tests

This repo uses [Ava](https://github.com/avajs/ava)
for test execution. To run tests, simply use either of the two options below.

```shell
npm test
npm run watch:test
```

or for yarn

```shell
yarn test
yarn watch:test
```

## Repo structure

Each day will have a folder with a file with a solution for both the first and second problems along with the input data for each problem.

There will also be a readme describing the thought process I had for each problem along with issues I ran into.

## Running the app

The application simply wait for input to pick a problem to simulate. The problem will return the result based on the input for my account.

You can change the input files and rerun to process other input. You do not need to restart the app to do this.
