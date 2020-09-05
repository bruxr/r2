const supertest = require('supertest');

const app = require('../../app');

const request = supertest(app.callback()); 

describe('POST /login', () => {
  test('with correct credentials', async () => {
    const res = await request
      .post('/login')
      .send({ email: 'test@example.com', password: 'secret' })
      .set('Accept', 'application/json')

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id: 1,
      email: 'test@example.com',
    });
  });
});
