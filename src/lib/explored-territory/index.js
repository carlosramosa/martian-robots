'use strict';

const { findExploredTerritory } = require('../db');

const getExploredTerritory = (status) =>
	findExploredTerritory(status);

module.exports = {
	getExploredTerritory,
};
