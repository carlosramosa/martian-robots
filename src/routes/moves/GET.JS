'use strict';

const { getAllMovements } = require('../../lib/movenments/get-robot-movements');

/* GET users listing. */
const getMovements =  async (req, res, next) => {
  const result = await getAllMovements();
  res.send(result);
};

module.exports = getMovements;
