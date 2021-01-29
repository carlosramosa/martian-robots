const redis = require('redis-mock');
const { movements } = require('../../fixtures/movements');
const { move } = require('./generate-robot-movement');
var mongodb = require('mongo-mock');
const {MongoClient} = require('mongodb');

jest.mock('redis', () => require('redis-mock'));
jest.mock('mongodb', () => require('mongo-mock'));
const mockCallback = jest.fn(x => 42 + x);

const { Connection } = require('../mongo')


describe ('Test generate robot movements', () => {



  beforeAll(async () => {
    await Connection.connectToMongo();

  });

  test('1', async () => {
    const a = await move(movements);
    expect(a).toEqual({});

  })
})
