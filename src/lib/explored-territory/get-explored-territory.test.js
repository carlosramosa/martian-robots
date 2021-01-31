'use strict';

const { robotsMovements } = require('../../fixtures/movements');
const { getExploredTerritory } = require('./get-explored-territory');
const { omit, map } = require('lodash/fp');
const { insertExploredTerritory } = require('../db');
const {
	failedExploration,
	successExploration,
	allExploredTerritory,
	allExploredFailedTerritory,
} = require('../../fixtures');

global.console = {
	log: jest.fn(),
};

const { Connection } = require('../mongo');
jest.mock('redis', () => require('redis-mock'));


beforeAll(async() => {
  await Connection.connectToMongo();
  await insertExploredTerritory(failedExploration, failedExploration.status);
  await insertExploredTerritory(successExploration, 'explored');
});

afterAll(async() => {
  await Connection.close()
});

describe ('Test territory explored functions', () => {


	it('Should get explored territory', async () => {
		const robotsMovements = await getExploredTerritory().then(map(omit(['_id'])));

		expect(robotsMovements).toHaveLength(2);
		expect(robotsMovements).toEqual(allExploredTerritory);
	});

	it('Should get explored territory', async () => {
		const robotsMovements = await getExploredTerritory('failed').then(map(omit(['_id'])));

		expect(robotsMovements).toHaveLength(1);
		expect(robotsMovements).toEqual(allExploredFailedTerritory);
	});
});
