'use strict';

const { Connection: mongoClient } = require('../mongo');
const redis = require('../redis');

const { last } = require('lodash/fp');

const insertMovements = (movements) => mongoClient.db.collection('robots').insertOne({
	movements,
	lost: !!last(movements).lost,
	totalSteps: movements.length,
});

const saveCoordinates = ({x, y}) => {
	console.log('INSERTING LOST COORDINATES', { x, y });
	return redis.getConnection().set(JSON.stringify({ 'x': x, 'y': y }), 'lost');
};

const findAllMovements = (params) =>
	mongoClient.db.collection('robots').find(params).toArray();

const insertExploredTerritory = ({x, y}, status) => mongoClient.db.collection('explored_territory').insertOne({
	status,
	x,
	y,
});

const findExploredTerritory = (status) =>
	mongoClient.db.collection('explored_territory').find({
		... (status ? { status } :{})
	}).toArray();

const getCoordinates = ({ x, y }) => {
	console.log('CHECK DB FOR LOST COORDINATES', { 'lostCoordinates': { x, y }});
	return redis.getConnection().get(JSON.stringify({ 'x': x, 'y': y }));
};

module.exports = {
	insertMovements,
	saveCoordinates,
	getCoordinates,
	findAllMovements,
	insertExploredTerritory,
	findExploredTerritory
};
