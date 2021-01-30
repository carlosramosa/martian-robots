'use strict';

const { getExploredTerritory } = require('../../lib/explored-territory');

/* GET users listing. */
const getExploredTerritories =  async ({ query: { status } }, res) => {
  const result = await getExploredTerritory(status);
  res.send(result);
};

module.exports = getExploredTerritories;
