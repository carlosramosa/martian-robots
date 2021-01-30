'use strict';

const { insertMovements, insertExploredTerritory, getCoordinates, saveCoordinates } = require('../db');
const { last , isEqual, negate} = require('lodash/fp');
const { instructionsMap } = require('./instructions');

const isLost = isEqual('lost');
const isDifferentFromLost = negate(isLost);

const isInside = (size, position) =>
  size.y>=position.y && size.x>=position.x;

const throwOutOfBoundsError = (size, position) => {
  console.error(
    `Position (${position.x}, ${position.x}) is out of limits ((0,0), (${size.x}, ${size.x}))`
  );
}

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
			if (isDifferentFromLost(value)) {
				position.lost = true;
				await insertExploredTerritory(positionAux, 'failed');
				await saveCoordinates(positionAux);
				steps[steps.length - 1].lost = true;
			}
		} else {
			await insertExploredTerritory(positionAux, 'explored');
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
{
  const movementsDone = [];
  for (const movement of movements) {
    isInside(size, movement.position)
    ? movementsDone.push(await makeMovement(size)(movement))
    : throwOutOfBoundsError(size, movement.position);
  }
  return movementsDone;
}
module.exports = {
	makeRobotMove,
};
