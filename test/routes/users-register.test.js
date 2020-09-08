const { some } = require('lodash');
const { expect } = require('chai');
const { describe, it } = require('mocha');

require('../setup');
const { request } = require('../helpers');
const User = require('../../app/models/user');
const createUsers = require('../fixtures/users');

const user = createUsers()[0];

describe('POST /register', () => {
  it('should return an error if there are missing user details', async () => {
    const res = await request.post('/register');
    expect(res.status).to.equal(422);
    expect(some(res.body.errors, { source: '/email' })).to.be.true;
    expect(some(res.body.errors, { source: '/password' })).to.be.true;
    expect(some(res.body.errors, { source: '/firstName' })).to.be.true;
    expect(some(res.body.errors, { source: '/lastName' })).to.be.true;
  });

  it('should create a user', async () => {
    await request
      .post('/register')
      .send(user)
      .set('Content-type', 'application/json');

    const created = await User.findOne({ email: user.email });
    expect(created).to.not.be.null;
  });

  it('should hash the password', async () => {
    await request
      .post('/register')
      .send(user)
      .set('Content-type', 'application/json');

    const created = await User.findOne({ email: user.email });
    expect(created.password).to.not.equal(user.password);
  });
});
