'use strict';

const request = require('supertest')
const app = require('../../app');

jest.mock('../../lib/db', () => ({
  findAllMovements: jest.fn()
  .mockResolvedValueOnce([])
  .mockResolvedValueOnce([]),
}));

describe('GET Robot Movements', () => {
  it('Should GET all movements', async () => {
    const res = await request(app)
      .get('/movements')
    expect(res.statusCode).toEqual(200)
  })

  it('Should GET lost movements', async () => {
    const res = await request(app)
      .get('/movements?lost=true')
    expect(res.statusCode).toEqual(200)
  })

  it('Should throw a validation error', async () => {
    const res = await request(app)
      .get('/movements?lost=fake')
    expect(res.statusCode).toEqual(400)
  })
});
