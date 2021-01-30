const request = require('supertest')
const app = require('../../app');

jest.mock('../../lib/db', () => ({
  findExploredTerritory: jest.fn()
  .mockResolvedValueOnce({}),
}));

describe('GET Explored Territory', () => {
  it('Should GET explored territory', async () => {
    const res = await request(app)
      .get('/explored-territory')
    expect(res.statusCode).toEqual(200)
  })

  it('Should GET explored territory failed', async () => {
    const res = await request(app)
      .get('/explored-territory?status=failed')
    expect(res.statusCode).toEqual(200)
  })

  it('Should throw a validation error', async () => {
    const res = await request(app)
      .get('/explored-territory?status=fake')
    expect(res.statusCode).toEqual(400)
  })
});
