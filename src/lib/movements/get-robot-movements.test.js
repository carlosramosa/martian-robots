'use strict';

const {
	robotMovementNoLost,
	robotMovementLost,
	allRobotMovements,
	allLostRobotMovements,
} = require('../../fixtures/movements');
const { getAllMovements } = require('./get-robot-movements');
const { insertMovements } = require('../db');
const { omit, map } = require('lodash/fp');

global.console = {
	log: jest.fn(),
};

const { Connection } = require('../mongo');
jest.mock('redis', () => require('redis-mock'));
jest.setTimeout(3 * 60 * 100000);

beforeAll(async() => {
  await Connection.connectToMongo();
  await insertMovements(robotMovementNoLost);
  await insertMovements(robotMovementLost);
});

afterAll(async() => {
  await Connection.close()
});

describe ('Test get robot movements', () => {

	it('Should get robot movements', async () => {
		const robotsMovements = await getAllMovements().then(map(omit(['_id'])));

    expect(robotsMovements).toHaveLength(2);
		expect(robotsMovements).toEqual(allRobotMovements);
	});

	it('Should get robot lost movements', async () => {
		const robotsMovements = await getAllMovements('true').then(map(omit(['_id'])));

		expect(robotsMovements).toHaveLength(1);
		expect(robotsMovements).toEqual(allLostRobotMovements);
	});
});
