const { expect } = require('chai');
const { describe, it, afterEach } = require('mocha');

require('../../setup');
const { request } = require('../../helpers');
const createUsers = require('../../fixtures/users');
const { loginAs, resetLogin } = require('../../../app/services/auth');

const testUser = createUsers()[0];

describe('GET /me', () => {
  afterEach(() => {
    resetLogin();
  });
  
  it('should return a 401 if not logged-in', async () => {
    const res = await request.get('/me');
    expect(res.status).to.equal(400);
  });

  it('should return the user if logged-in', async () => {
    loginAs(testUser);
    
    const res = await request.get('/me');
    expect(res.status).to.equal(200);
    expect(res.body.email).to.equal(testUser.email);
  });
});
