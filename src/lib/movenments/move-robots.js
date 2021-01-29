'use strict';

const redis = require('../redis');
const redisClient = redis.getConnection();

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

const isOutOfLimit = (original, size) => (currentPosition) =>
	(original.x !== currentPosition.x && (currentPosition.x > size.x || currentPosition.x < 0))
    || (original.y !== currentPosition.y && (currentPosition.y > size.y || currentPosition.y < 0));

const makeMovement = async(position, size, instructions) => {

	const isOutOfRange = isOutOfLimit(position, size);
	let currentPosition = {...position};
	const res = [];
	for(const instruction of instructions){
		if (!currentPosition.lost){
			console.log(currentPosition);
			let positionAux =  instructionsMap[instruction](currentPosition);
			if (!isOutOfRange(positionAux)){
				currentPosition = positionAux;
				// await client.rpush('explored', JSON.stringify({ 'x': positionAux.x, 'y': positionAux.y }));
				res.push({...currentPosition, lost: false });
				// var multi = client.multi()

				// multi.exec(function(errors, results) {

				// })
			} else {
				console.log('CHECK DB FOR LOST COORDINATES', { 'lostCoordinates': { x: positionAux.x, y: positionAux.y}});
				const value = await redisClient.get(JSON.stringify({ 'x': positionAux.x, 'y': positionAux.y }));
				console.log('COORDINATES STATE', value ? value + '--> REMEMBER OTHER ROBOT LOST' : '--> THIS ROBOT WILL BE LOST');
				if (value!=='lost') {
					currentPosition.lost = true;
					console.log('INSERTING LOST COORDINATES', { x: positionAux.x, y: positionAux.y});
					await redisClient.set(JSON.stringify({ 'x': positionAux.x, 'y': positionAux.y }), 'lost');
					res[res.length - 1].lost = true;
				}
			}
		}
	}
	await mongoClient.db.collection('robots').insertOne({
		movements: res,
		lost: !!last(res).lost,
		totalSteps: res.length,
	});
	console.log(res);
	return last(res);
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
