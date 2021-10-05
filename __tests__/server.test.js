'use strict';

const { server } = require('../src/server');
const supertest = require('supertest');
const mockReq = supertest(server);

// Pet Data
const petMockData = {
  petType: 'Dog',
  petColor: 'Black and White'
}
const petMockData2 = {
  petType: 'Hamster',
  petColor: 'Brown and White'
}

// Apex Data
const apexMockData = {
  legendName: 'Octane',
  legendPassive: 'Health Regeneration' 
}
const apexMockData2 = {
  legendName: 'Gibby',
  legendPassive: 'Shield'
}

const emptyMockData = {}

// This brings in the db for testing
const { db } = require('../src/models/index');

// Syncs/Starts up db before starting
beforeAll(async () => {
  await db.sync();
});

// Drops/Stops db after testing is done
afterAll(async () => {
  await db.drop();
});

describe('Route Testing', () => {

  // Pet Route Testing
  it('should respond with 404 on bad route', async () => {
    const response = await mockReq.get('/potato');
    expect(response.status).toBe(404);
  });

  it('should respond with a 404 on a bad method', async () => {
    const response = await mockReq.patch('/pet');
    expect(response.status).toBe(404);
  });

  it('should respond with 200 with creating using POST', async () => {
    const response = await mockReq.post('/pet').send(petMockData);
    expect(response.status).toBe(200);
    expect(typeof response.body).toEqual('object');
  });

  it('should respond with 200 with reading a list of records with GET', async () => {
    const response = await mockReq.get('/pet');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toEqual(1);
  });

  it('should respond with 200 with reading one record using GET', async () => {
    const response = await mockReq.get('/pet/1');
    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined();
  });

  it('should respond with a 200 with updating a record using PUT', async () => {
    const response = await mockReq.put('/pet/1').send(petMockData2);
    expect(response.status).toBe(200);
    expect(response.body.petType).toEqual('Hamster');
  });

  it('should respond with a 200 if able to destroy using DELETE', async () => {
    const response = await mockReq.delete('/pet/1');
    expect(response.status).toBe(200);

    const getRes = await mockReq.get('/pet/1');
    expect(getRes.body).toEqual(null);
  });

  //Apex Testing
  it('should respond with 404 on bad route', async () => {
    const response = await mockReq.get('/potato');
    expect(response.status).toBe(404);
  });

  it('should respond with a 404 on a bad method', async () => {
    const response = await mockReq.patch('/apexlegend');
    expect(response.status).toBe(404);
  });

  it('should respond with 200 with creating using POST', async () => {
    const response = await mockReq.post('/apexlegend').send(apexMockData);
    expect(response.status).toBe(200);
    expect(typeof response.body).toEqual('object');
  });

  it('should respond with 200 with reading a list of records with GET', async () => {
    const response = await mockReq.get('/apexlegend');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toEqual(1);
  });

  it('should respond with 200 with reading one record using GET', async () => {
    const response = await mockReq.get('/apexlegend/1');
    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined();
  });

  it('should respond with a 200 with updating a record using PUT', async () => {
    const response = await mockReq.put('/apexlegend/1').send(apexMockData2);
    expect(response.status).toBe(200);
    expect(response.body.legendName).toEqual('Gibby');
  });

  it('should respond with a 200 if able to destroy using DELETE', async () => {
    const response = await mockReq.delete('/apexlegend/1');
    expect(response.status).toBe(200);

    const getRes = await mockReq.get('/apexlegend/1');
    expect(getRes.body).toEqual(null);
  });

});
