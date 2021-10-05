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
const allPetsMockData = {
  petMockData,
  petMockData2
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
const allApexMockData = {
  apexMockData,
  apexMockData2
}

const emptyMockData = {}

const { db } = require('../src/models/index');

beforeAll(async () => {
  await db.sync();
});

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
  });

  it('should respond with 200 with reading a list of records with GET', async () => {
    const response = await mockReq.get('/pet').send(allPetsMockData);
    expect(response.status).toBe(200);
  });

  it('should respond with 200 with reading one record using GET', async () => {
    const response = await mockReq.get('/pet/1').send(allPetsMockData);
    expect(response.status).toBe(200);
  });

  it('should respond with a 200 with updating a record using PUT', async () => {
    const response = await mockReq.put('/pet/1').send(petMockData2);
    expect(response.status).toBe(200);
  });

  it('should respond with a 200 if able to destroy using DELETE', async () => {
    const response = await mockReq.delete('/pet/1').send(allPetsMockData);
    expect(response.status).toBe(200);
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
  });

  it('should respond with 200 with reading a list of records with GET', async () => {
    const response = await mockReq.get('/apexlegend').send(allApexMockData);
    expect(response.status).toBe(200);
  });

  it('should respond with 200 with reading one record using GET', async () => {
    const response = await mockReq.get('/apexlegend/1').send(allApexMockData);
    expect(response.status).toBe(200);
  });

  it('should respond with a 200 with updating a record using PUT', async () => {
    const response = await mockReq.put('/apexlegend/1').send(apexMockData2);
    expect(response.status).toBe(200);
  });

  it('should respond with a 200 if able to destroy using DELETE', async () => {
    const response = await mockReq.delete('/apexlegend/1').send(allApexMockData);
    expect(response.status).toBe(200);
  });

});
