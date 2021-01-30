'use strict';

const { getAllMovements } = require('../../lib/movements/get-robot-movements');

const getMovements =  async ({ query: { lost } }, res, next) => {
  const result = await getAllMovements(...lost ? { lost: lost === 'true'} : {});
  res.send(result);
};

module.exports = getMovements;
