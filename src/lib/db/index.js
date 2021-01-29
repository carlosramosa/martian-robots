'use strict';

const redis = require('../redis');
const redisClient = redis.getConnection();
const { last } = require('lodash/fp');

const { Connection: mongoClient } = require('../mongo');

const insertMovements = (movements) => mongoClient.db.collection('robots').insertOne({
    movements,
    lost: !!last(movements).lost,
    totalSteps: movements.length,
  });

const saveCoordinates = ({x, y}) =>
  redisClient.set(JSON.stringify({ 'x': x, 'y': y }), 'lost');

const getCoordinates = ({ x, y }) =>
  redisClient.get(JSON.stringify({ 'x': x, 'y': y }));

module.exports = {
  insertMovements,
  saveCoordinates,
  getCoordinates,
}
