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
	log: jest.fn(), // console.log are ignored in tests
};

const { Connection } = require('../mongo');
jest.mock('redis', () => require('redis-mock'));

describe ('Test territory explored functions', () => {

	beforeAll(async() => {
		await Connection.connectToMongo();
		await insertExploredTerritory(failedExploration, failedExploration.status);
		await insertExploredTerritory(successExploration, 'explored');
	});

	afterAll(async() => {
		await Connection.close();
	});

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
