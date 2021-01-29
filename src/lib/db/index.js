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

const saveCoordinates = ({x, y}) => {
  console.log('INSERTING LOST COORDINATES', { x, y });
  return redisClient.set(JSON.stringify({ 'x': x, 'y': y }), 'lost');
}

const getCoordinates = ({ x, y }) => {
  console.log('CHECK DB FOR LOST COORDINATES', { 'lostCoordinates': { x, y }});
  return redisClient.get(JSON.stringify({ 'x': x, 'y': y }));
}

module.exports = {
  insertMovements,
  saveCoordinates,
  getCoordinates,
}
