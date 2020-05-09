/**
 * Little until class to help with position
 */
class Vec2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  add = (otherVec2) => {
    return new Vec2(this.x + otherVec2.x, this.y + otherVec2.y);
  };

  scale = (scalar) => {
    return new Vec2(this.x * scalar, this.y * scalar);
  };
}

/**
 * simple direction mapping
 */
const dirCharMap = {
  NR: 'E',
  NL: 'W',
  ER: 'S',
  EL: 'N',
  SR: 'W',
  SL: 'E',
  WR: 'N',
  WL: 'S',
};

/**
 * map direction to vec2
 */
const dirVecMap = {
  N: new Vec2(0, 1),
  E: new Vec2(1, 0),
  S: new Vec2(0, -1),
  W: new Vec2(-1, 0),
};

export const inputDelimiter = ', ';

/**
 * Process steps from string input.
 * step format will be {turn direction}{steps} sep by ', ';
 * example input L1, L3, R100 ...
 * @param {string} input
 */
export const calcDist = (input) => {
  if (!input) {
    return 0;
  }

  const steps = input.split(inputDelimiter);
  let dir = 'N';
  let position = new Vec2(0, 0);
  for (let step of steps) {
    const turnChar = step[0];
    const stepCount = Number.parseInt(step.substring(1));
    dir = dirCharMap[dir + turnChar];
    position = position.add(dirVecMap[dir].scale(stepCount));
  }
  return Math.abs(position.x) + Math.abs(position.y);
};

/**
 * Same as calcDist but done a bit more functional
 * @param {string} input
 */
export const calcDistFunc = (input) => {
  return traverse(buildStepArray(input), 0, 0, 'N');
};

const buildStepArray = (input) => {
  if (!input) {
    return [];
  }
  return input.split(inputDelimiter);
};

/**
 * Should be a pure function that will traverse the steps until the end.
 * @param {Array} steps
 * @param {Number} x
 * @param {Number} y
 * @param {String} dir
 */
const traverse = (steps, x, y, dir) => {
  if (steps.length === 0) {
    return Math.abs(x) + Math.abs(y);
  }
  const step = steps[0];
  const turnChar = step[0];
  const stepCount = Number.parseInt(step.substring(1));
  dir = dirCharMap[dir + turnChar];
  const vel = dirVecMap[dir].scale(stepCount);
  return traverse(steps.slice(1), x + vel.x, y + vel.y, dir);
};
