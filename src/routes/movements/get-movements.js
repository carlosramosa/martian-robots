'use strict';

const { getAllMovements } = require('../../lib/movements/get-robot-movements');

// const getLost = (lost) => {
//   if (lost)
// }

const getMovements =  async ({ query: { lost } }, res, next) => {
  const result = await getAllMovements(lost);
  res.send(result);
};

module.exports = getMovements;
