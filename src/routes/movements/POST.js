'use strict';

const { makeRobotMove } = require('../../lib/movements/generate-robot-movement');
/* GET users listing. */
const postMovement = async ({ body }, res) => {
	const result = await makeRobotMove(body);
	res.send(result);
};

module.exports = postMovement;
