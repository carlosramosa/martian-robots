'use strict';

const { findExploredTerritory } = require('../db');

/**
 * @function          getExploredTerritory
 * @param   {String}  status failed|explored
 * @returns {Array}   a list of coordinates
 */
const getExploredTerritory = findExploredTerritory;

module.exports = {
	getExploredTerritory,
};
