'use strict';

const { findAllMovements } = require('../db');

/**
 * @function getAllMovements
 * @param   {String} lost true|false
 * @returns {Array}  a list of movements
 */
const getAllMovements = findAllMovements;

module.exports = {
	getAllMovements,
};
