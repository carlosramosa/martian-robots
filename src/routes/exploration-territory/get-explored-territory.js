'use strict';

const { getExploredTerritory } = require('../../lib/explored-territory');

const getExploredTerritories =  async ({ query: { status } }, res) => {
  const exploredTerritory = await getExploredTerritory(status);
  res.send(exploredTerritory);
};

module.exports = getExploredTerritories;
