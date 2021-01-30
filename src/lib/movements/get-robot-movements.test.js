const { movements } = require('../../fixtures/movements');
const { makeRobotMove } = require('./generate-robot-movement');
const { getAllMovements } = require('./get-robot-movements');
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
const { Connection } = require('../mongo');
jest.mock('../db', () => ({
  ...jest.requireActual('../db'),
	getCoordinates: jest.fn()
		.mockResolvedValueOnce('lost')
		.mockResolvedValueOnce(null),
	insertExploredTerritory: jest.fn(),
}));

describe ('Test generate robot movements', () => {

  afterAll(() => Connection.close())

	it('Should make robot move', async () => {
    await Connection.connectToMongo();
		await makeRobotMove(movements);
    const _movements = await getAllMovements();
    require('fs').writeFileSync('as.json', JSON.stringify(_movements, null, 2));
    expect(_movements[0]).toMatchObject(
      {
        "movements": [
          {
            "x": 1,
            "y": 1,
            "o": "S",
            "lost": false
          },
          {
            "x": 1,
            "y": 0,
            "o": "S",
            "lost": false
          },
          {
            "x": 1,
            "y": 0,
            "o": "W",
            "lost": false
          },
          {
            "x": 0,
            "y": 0,
            "o": "W",
            "lost": false
          },
          {
            "x": 0,
            "y": 0,
            "o": "N",
            "lost": false
          },
          {
            "x": 0,
            "y": 1,
            "o": "N",
            "lost": false
          },
          {
            "x": 0,
            "y": 1,
            "o": "E",
            "lost": false
          },
          {
            "x": 1,
            "y": 1,
            "o": "E",
            "lost": false
          }
        ],
        "lost": false,
        "totalSteps": 8
      });
      expect(_movements[1]).toMatchObject(
      {
        "movements": [
          {
            "x": 0,
            "y": 3,
            "o": "S",
            "lost": false
          },
          {
            "x": 0,
            "y": 3,
            "o": "E",
            "lost": false
          },
          {
            "x": 1,
            "y": 3,
            "o": "E",
            "lost": false
          },
          {
            "x": 2,
            "y": 3,
            "o": "E",
            "lost": false
          },
          {
            "x": 3,
            "y": 3,
            "o": "E",
            "lost": false
          },
          {
            "x": 3,
            "y": 3,
            "o": "N",
            "lost": false
          },
          {
            "x": 3,
            "y": 3,
            "o": "W",
            "lost": false
          },
          {
            "x": 2,
            "y": 3,
            "o": "W",
            "lost": false
          },
          {
            "x": 2,
            "y": 3,
            "o": "S",
            "lost": false
          }
        ],
        "lost": false,
        "totalSteps": 9
      });
      expect(_movements[2]).toMatchObject(
      {
        "movements": [
          {
            "x": 3,
            "y": 3,
            "o": "N",
            "lost": false
          },
          {
            "x": 3,
            "y": 3,
            "o": "E",
            "lost": false
          },
          {
            "x": 3,
            "y": 3,
            "o": "S",
            "lost": false
          },
          {
            "x": 3,
            "y": 2,
            "o": "S",
            "lost": false
          },
          {
            "x": 3,
            "y": 2,
            "o": "E",
            "lost": false
          },
          {
            "x": 3,
            "y": 2,
            "o": "N",
            "lost": false
          },
          {
            "x": 3,
            "y": 3,
            "o": "N",
            "lost": true
          }
        ],
        "lost": true,
        "totalSteps": 7
      }
    );
	});
});
