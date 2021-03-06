'use strict';

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

module.exports = {
	instructionsMap,
};
