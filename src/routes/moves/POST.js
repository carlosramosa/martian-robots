'use strict';

const { move } = require('../../lib/movenments/move-robots');
/* GET users listing. */
const postMovement = async ({ body }, res) => {
	const result = await move(body);
	res.send(result);
};

module.exports = postMovement;
