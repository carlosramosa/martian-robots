'use strict';

const redis = require('../redis');
const redisClient = redis.getConnection();
const { insertMovements, getCoordinates, saveCoordinates } = require('../db')
const { Connection: mongoClient } = require('../mongo');
const { last } = require('lodash/fp');


const moveToNorth = ({
	x, y, o,
}) => ({
	x, y: y + 1, o
});

const moveToSouth = ({
	x, y, o,
}) => ({
	x, y: y - 1, o
});

const moveToWest = ({
	x, y, o,
}) => ({
	x: x - 1, y, o
});

const moveToEast = ({
	x, y, o,
}) => ({
	x: x + 1, y, o
});

const movementMap = {
	N: moveToNorth,
	S: moveToSouth,
	W: moveToWest,
	E: moveToEast
};

const move = ({
	x, y, o
}) => movementMap[o]({
	x, y, o
});

const turnRightMap = {
	N: 'E',
	W: 'N',
	S: 'W',
	E: 'S',
};

const turnRight = ({
	x, y, o
}) => ({
	x, y, o: turnRightMap[o]
});

const turnLeftMap = {
	N: 'W',
	W: 'S',
	S: 'E',
	E: 'N',
};

const turnLeft = ({
	x, y, o
}) => ({
	x, y, o: turnLeftMap[o]
});

const instructionsMap = {
	L: turnLeft,
	R: turnRight,
	F: move,
};

const setLastLostTrue = (steps) =>
  [steps.length - 1].lost = true;

const isOutOfLimit = (original, size) => (position) =>
	(original.x !== position.x && (position.x > size.x || position.x < 0))
    || (original.y !== position.y && (position.y > size.y || position.y < 0));

const makeMovement = async(initialPosition, size, instructions) => {

	const isOutOfRange = isOutOfLimit(initialPosition, size);
	let position = {...initialPosition};
  const steps = [];
  let i = 0;
  // while (i<instructions.length && !position.lost) {
  //   const instruction = instructions[i];
  //   console.log(position);
  //   let positionAux =  instructionsMap[instruction](position);
  //   if (!isOutOfRange(positionAux)){
  //     position = positionAux;
  //     steps.push({...position, lost: false });
  //   } else {
  //     console.log('CHECK DB FOR LOST COORDINATES', { 'lostCoordinates': { x: positionAux.x, y: positionAux.y}});
  //     const value = await getCoordinates(positionAux);
  //     console.log('COORDINATES STATE', value ? value + '--> REMEMBER OTHER ROBOT LOST' : '--> THIS ROBOT WILL BE LOST');
  //     if (value!=='lost') {
  //       position.lost = true;
  //       console.log('INSERTING LOST COORDINATES', { x: positionAux.x, y: positionAux.y});
  //       await saveCoordinates(position)
  //       setLastLostTrue(steps)[steps.length - 1].lost = true;
  //     }
  //   }
  // }
	for(const instruction of instructions){
		if (!position.lost){
			console.log(position);
			let positionAux =  instructionsMap[instruction](position);
			if (!isOutOfRange(positionAux)){
				position = positionAux;
				steps.push({...position, lost: false });
			} else {
				console.log('CHECK DB FOR LOST COORDINATES', { 'lostCoordinates': { x: positionAux.x, y: positionAux.y}});
				const value = await redisClient.get(JSON.stringify({ 'x': positionAux.x, 'y': positionAux.y }));
				console.log('COORDINATES STATE', value ? value + '--> REMEMBER OTHER ROBOT LOST' : '--> THIS ROBOT WILL BE LOST');
				if (value!=='lost') {
					position.lost = true;
					console.log('INSERTING LOST COORDINATES', { x: positionAux.x, y: positionAux.y});
					await redisClient.set(JSON.stringify({ 'x': positionAux.x, 'y': positionAux.y }), 'lost');
					steps[steps.length - 1].lost = true;
				}
			}
		}
	}
	await insertMovements(steps);
	console.log(steps);
	return last(steps);
};

const moveAlien = async ({
	size,
	movements,
}) => {
	// const a = await client.get(`${size.x}${size.y}`);
	// await client.set(`${size.x}${size.y}`, 'hola');
	// const asd = await client.get(`${size.x}${size.y}`);
	const res = [];
	for(const { position, instructions } of movements) {
		res.push(await makeMovement(position, size, instructions));
	}
	return res;
	// return Promise.all(movements.map(({ position, instructions }) =>
	//   makeMovement(position, size, instructions, client)
	// ));
};

module.exports = {
	move: moveAlien,
};
//"instructions": ["R", "F","R", "F","R", "F", "R", "F"] --> 1,1,
//["F","R","R","F","L","L","F","F","R","R","F","L","L"]
//"instructions": ["L","L","F","F","F","L","F","L","F","L"]
