'use strict';

const { robotsMovements, robotMovementResult } = require('../../fixtures');
const { makeRobotMove } = require('./generate-robot-movement');

global.console = {
	log: jest.fn(),
};

const redis = require('../redis');
const redisClient = redis.getConnection();
const { Connection } = require('../mongo');

jest.mock('redis', () => require('redis-mock'));

jest.mock('../db', () => ({
	insertMovements: jest.fn(),
	saveCoordinates: jest.fn(),
	getCoordinates: jest.fn()
		.mockResolvedValueOnce(null)
    .mockResolvedValueOnce('lost')
    .mockResolvedValueOnce('lost')
    .mockResolvedValueOnce('lost'),
	findAllMovements: jest.fn(),
	insertExploredTerritory: jest.fn(),
	findExploredTerritory: jest.fn(),
}));

describe ('Test generate robot movements', () => {
	beforeAll(() => Connection.connectToMongo());

	beforeEach(async() => {
		await redisClient.flushall();
		await Connection.db.dropDatabase();
	});

  afterAll(() => Connection.close());

	it('Should make robot move', async () => {
		const result = await makeRobotMove(robotsMovements);
		expect(result).toEqual(robotMovementResult);
	});
});
