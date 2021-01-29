'use strict';

const { compose } = require('lodash/fp');
const { makeRobotMove } = require('../../lib/movenments/generate-robot-movement');
/* GET users listing. */
const postMovement = async ({ body }, res) => {
	const result = await makeRobotMove(body);
	res.send(result);
};

module.exports = postMovement;
