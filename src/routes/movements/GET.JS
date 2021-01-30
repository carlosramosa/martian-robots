'use strict';

const { getAllMovements } = require('../../lib/movements/get-robot-movements');

/* GET users listing. */
const getMovements =  async ({ query: { lost } }, res, next) => {
  const result = await getAllMovements(lost === 'true');
  res.send(result);
};

module.exports = getMovements;
