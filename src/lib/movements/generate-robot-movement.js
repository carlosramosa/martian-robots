'use strict';
const redis = require('../redis');
const redisClient = redis.getConnection();
const { insertMovements, insertExploredTerritory, getCoordinates, saveCoordinates } = require('../db');
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
	// añadir testing
	// guardar toda la superficie recorrida

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
    movementsDone.push(await makeMovement(size)(movement));
  }
  return movementsDone;
}
module.exports = {
	makeRobotMove,
};
