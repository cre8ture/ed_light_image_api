// test.js
const { app, server } = require('../index');
const request = require('supertest');


describe('GET /', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  });
});

describe('GET /health', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
  });
});

it('should return 201 Created', async () => {
    const res = await request(app).post('/image_url').send({ image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg' });
    expect(res.statusCode).toEqual(201);
  }, 10000); // 10 seconds

  it('should return 201 Created', async () => {
    const res = await request(app).post('/image_file').send({ base64: 'data:image/jpeg;base64,/9j/4AAQSk...' });
    expect(res.statusCode).toEqual(201);
  }, 10000); // 10 seconds

afterAll(done => {
    server.close(done);
  });