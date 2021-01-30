const request = require('supertest')
const app = require('../../app');
const { robotsMovements } = require('../../fixtures');

jest.mock('../../lib/db');

jest.mock('../../lib/movements/generate-robot-movement', () => ({
  makeRobotMove: jest.fn().mockResolvedValueOnce([]),
}));


describe('POST Robot Movements', () => {
  it('Should POST robot movements', async () => {
    const res = await request(app)
      .post('/movements')
      .send(robotsMovements)
    expect(res.statusCode).toEqual(200)
  })

  it('Should throw a validation error', async () => {
    const res = await request(app)
    .post('/movements')
    .send({...robotsMovements, size: { y: 60, x: 3 }})
    expect(res.statusCode).toEqual(400)
  })
});
