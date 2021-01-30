'use strict';

const { makeRobotMove } = require('../../lib/movements/generate-robot-movement');

const postMovement = async ({ body }, res) => {
	const movementsResult = await makeRobotMove(body);
	res.send(movementsResult);
};

module.exports = postMovement;
