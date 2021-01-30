'use strict';

const { findAllMovements } = require('../db');

const { Connection: mongoClient } = require('../mongo');

const getAllMovements = findAllMovements;

module.exports = {
	getAllMovements,
};
