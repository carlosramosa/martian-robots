'use strict';

const { insertMovements, getCoordinates, saveCoordinates } = require('../db')
const { last , isEqual, negate} = require('lodash/fp');
const { instructionsMap } = require('./instructions');

const isLost = isEqual('lost');
const isDifferentFromLost = negate(isLost);

const isOutOfLimits = (original, size) => (position) =>
	(original.x !== position.x && (position.x > size.x || position.x < 0))
    || (original.y !== position.y && (position.y > size.y || position.y < 0));

const makeMovement = (size) => async({ position: initialPosition, instructions }) => {
  const isOutOfRange = isOutOfLimits(initialPosition, size);

	let position = {...initialPosition};
  const steps = [];
  let i = 0;

  while (i<instructions.length && !position.lost) {
    const instruction = instructions[i];
    let positionAux =  instructionsMap[instruction](position);
    if (isOutOfRange(positionAux)){
      const value = await getCoordinates(positionAux);
      console.log('COORDINATES STATE', value ? value + '--> REMEMBER OTHER ROBOT LOST' : '--> THIS ROBOT WILL BE LOST');
      if (isDifferentFromLost(value)) {
        position.lost = true;
        await saveCoordinates(positionAux);
        steps[steps.length - 1].lost = true;
      }
    } else {
      position = positionAux;
      steps.push({...position, lost: false });
    }
    i++;
  }

	await insertMovements(steps);
	return last(steps);
};

const makeRobotMove = async ({
	size,
	movements,
}) =>
	Promise.all(movements.map(makeMovement(size)));

module.exports = {
	makeRobotMove,
};
