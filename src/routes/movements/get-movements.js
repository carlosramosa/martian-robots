'use strict';

const { getAllMovements } = require('../../lib/movements/get-robot-movements');

const getMovements =  async ({ query: { lost } }, res) => {
  const result = await getAllMovements(lost);
  res.send(result);
};

module.exports = getMovements;
