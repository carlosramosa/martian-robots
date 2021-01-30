'use strict';

const { getAllMovements } = require('../../lib/movements/get-robot-movements');

const getMovements =  async ({ query: { lost } }, res) => {
  const movements = await getAllMovements(lost);
  res.send(movements);
};

module.exports = getMovements;
