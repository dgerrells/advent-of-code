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
 * returns the distance away from the first duplicate step
 * @param {string} input
 */
export const calcDup = (input) => {
  if (!input) {
    return 0;
  }

  const steps = input.split(inputDelimiter);
  let dir = 'N';
  let position = new Vec2(0, 0);
  const pathLines = [position];

  for (let step of steps) {
    const turnChar = step[0];
    const stepCount = Number.parseInt(step.substring(1));
    dir = dirCharMap[dir + turnChar];
    position = position.add(dirVecMap[dir].scale(stepCount));

    for (let i = 0; i < pathLines.length - 2; i++) {
      const p1Start = pathLines[i];
      const p1End = pathLines[i + 1];
      const intersect = getIntersection(
        p1Start,
        p1End,
        pathLines[pathLines.length - 1],
        position
      );
      if (intersect) {
        return Math.abs(intersect.x) + Math.abs(intersect.y);
      }
    }

    pathLines.push(position);
  }
  return Math.abs(position.x) + Math.abs(position.y);
};

/**
 * Same as calcDup but more functional
 * @param {string} input
 */
export const calcDupFunc = (input) => {
  return traverse(buildStepArray(input), 0, 0, 'N', [new Vec2()]);
};

const buildStepArray = (input) => {
  if (!input) {
    return [];
  }
  return input.split(inputDelimiter);
};

/**
 * A more functional verison of traversing to the duplicate step.
 * If no duplicate is found, it returns the same as calcDist in day1_1
 * This should be pure.
 * @param {Array} steps
 * @param {Number} x
 * @param {Number} y
 * @param {String} dir
 * @param {Array} takenSteps
 */
export const traverse = (steps, x, y, dir, takenSteps = []) => {
  if (steps.length === 0) {
    return Math.abs(x) + Math.abs(y);
  }
  const step = steps[0];
  const turnChar = step[0];
  const stepCount = Number.parseInt(step.substring(1));
  dir = dirCharMap[dir + turnChar];
  const vel = dirVecMap[dir].scale(stepCount);

  // reusing the Vec2 class here so I can reuse intersection.
  const position = new Vec2(x + vel.x, y + vel.y);
  const intersection = getDupStep(position, takenSteps);
  if (intersection) {
    return traverse([], intersection.x, intersection.y, dir, takenSteps);
  }

  return traverse(steps.slice(1), x + vel.x, y + vel.y, dir, [
    ...takenSteps,
    position,
  ]);
};

const getDupStep = (stepPos, takenSteps) => {
  for (let i = 0; i < takenSteps.length - 2; i++) {
    const p1Start = takenSteps[i];
    const p1End = takenSteps[i + 1];
    const intersect = getIntersection(
      p1Start,
      p1End,
      takenSteps[takenSteps.length - 1],
      stepPos
    );
    if (intersect) {
      return intersect;
    }
  }
  return false;
};

const getIntersection = (startP1, endP1, startP2, endP2) => {
  const isP1Vertical = startP1.y === endP1.y;
  const isP2Vertical = startP2.y === endP2.y;
  if (isP1Vertical && isP2Vertical) {
    if (startP1.x !== startP2.x) {
      return false;
    }
  }

  //fill set with step coords from start to end p1
  //we care about order here so a map will not work
  const p1PathSet = fillLinePoints(startP1, endP1);
  const p2PathSet = fillLinePoints(startP2, endP2);

  for (let path of p2PathSet) {
    if (p1PathSet.has(path)) {
      //ugly parsing here. A map would fix this but order is important
      let x = Number.parseInt(path.split(',')[0]);
      let y = Number.parseInt(path.split(',')[1]);
      return new Vec2(x, y);
    }
  }
  return false;
};

/**
 * Returns a set filled with coord points {x,y} from the start point to end point
 * @param {Vec2} start
 * @param {Vec2} end
 */
const fillLinePoints = (start, end) => {
  return fillX(start.x, end.x, start.y, fillY(start.y, end.y, start.x));
};

export const fillX = (x, endX, y, toFill = new Set()) => {
  toFill.add(`${x},${y}`);
  if (x === endX) {
    return toFill;
  }
  return fillX(x < endX ? x + 1 : x - 1, endX, y, toFill);
};

export const fillY = (y, endY, x, toFill = new Set()) => {
  toFill.add(`${x},${y}`);
  if (y === endY) {
    return toFill;
  }
  return fillY(y < endY ? y + 1 : y - 1, endY, x, toFill);
};
