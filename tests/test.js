// test.js
const { app, server } = require('../index');
const request = require('supertest');
const fs = require('fs');
require('dotenv').config();
const AUTHORIZATION = process.env.AUTHORIZATION

// Function to encode the image
function encodeImage(imagePath) {
  const imageBuffer = fs.readFileSync(imagePath);
  return imageBuffer.toString('base64');
}


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
    const res = await request(app)
      .post('/image_url')
      .set('Authorization', AUTHORIZATION)
      .send({ image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg' });
    expect(res.statusCode).toEqual(201);
  }, 50000); // 50 seconds

  const imagePath = "./tests/images/test3.jpeg"
  const base64Image = encodeImage(imagePath);

it('should return 201 Created', async () => {
  // const imagePath = path.join(process.cwd(), "/tests/images/test3.jpeg");

    const res = await request(app)
      .post('/image_file')
      .set('Authorization', AUTHORIZATION)
      .send({ base64: base64Image}); // also could use: 'SGVsbG8sIHdvcmxkIQ==' });
    expect(res.statusCode).toEqual(201);
}, 50000); // 50 seconds


// Test for /image_url route with invalid ayth key
it('should return 500 Internal Server Error', async () => {
  const res = await request(app)
    .post('/image_url')
    .set('Authorization', 'wrong key')
    .send({ image_url: 'invalid_url' });
  expect(res.statusCode).toEqual(401);
}, 50000); // 10 seconds

// Test for /image_file route with auth key
it('should return 500 Internal Server Error', async () => {
  const res = await request(app)
    .post('/image_file')
    .set('Authorization', 'wrong key')
      .send({ base64: base64Image});
  expect(res.statusCode).toEqual(401);
}, 50000); // 50 seconds



// Test for /image_url route with invalid data
it('should return 500 Internal Server Error', async () => {
  const res = await request(app)
    .post('/image_url')
    .set('Authorization', AUTHORIZATION)
    .send({ image_url: 'invalid_url' });
  expect(res.statusCode).toEqual(500);
}, 50000); // 10 seconds

// Test for /image_file route with invalid data
it('should return 500 Internal Server Error', async () => {
  const res = await request(app)
    .post('/image_file')
    .set('Authorization',AUTHORIZATION)
      .send({ "error": ""});
  expect(res.statusCode).toEqual(201);
}, 50000); // 50 seconds


afterAll(done => {
    server.close(done);
  });