const { movements } = require('../../fixtures/movements');
const { makeRobotMove } = require('./generate-robot-movement');
const {
	insertMovements,
	saveCoordinates,
	getCoordinates,
	findAllMovements,
	insertExploredTerritory,
	findExploredTerritory
} = require('../db');

jest.mock('redis', () => require('redis-mock'));
jest.mock()
jest.mock('../db', () => ({
	insertMovements: jest.fn(),
	saveCoordinates: jest.fn(),
	getCoordinates: jest.fn()
		.mockResolvedValueOnce('lost')
		.mockResolvedValueOnce(null),
	findAllMovements: jest.fn(),
	insertExploredTerritory: jest.fn(),
	findExploredTerritory: jest.fn(),
}));

describe ('Test generate robot movements', () => {
	it('Should make robot move', async () => {
		const result = await makeRobotMove(movements);
		expect(result).toEqual([
			{
				'x': 1,
				'y': 1,
				'o': 'E',
				'lost': false
			},
			{
				'x': 3,
				'y': 3,
				'o': 'N',
				'lost': true
			},
			{
				'x': 2,
				'y': 3,
				'o': 'S',
				'lost': false
			}
		]);
	});
});
