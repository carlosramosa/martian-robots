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
	log: jest.fn(), // console.log are ignored in tests
};

const { Connection } = require('../mongo');
jest.mock('redis', () => require('redis-mock'));

describe ('Test get robot movements', () => {

	beforeAll(async() => {
		await Connection.connectToMongo();
		await insertMovements(robotMovementNoLost);
		await insertMovements(robotMovementLost);
	});

	afterAll(Connection.close());

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
