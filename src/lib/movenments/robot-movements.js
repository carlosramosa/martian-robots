'use strict';

const { Connection: mongoClient } = require('../mongo');

const getAllMovements = () =>
	mongoClient.db.collection('robots').find().toArray();

module.exports = {
	getAllMovements,
};
