const faker = require('faker');
const bcrypt = require('bcrypt');
const { some } = require('lodash');
const { expect } = require('chai');
const mongoose = require('mongoose');
const { describe, it, beforeEach } = require('mocha');

require('../setup');
const { request } = require('../helpers');
const createUsers = require('../fixtures/users');

const testPassword = faker.internet.password();
const testUser = {
  email: faker.internet.email(),
  password: bcrypt.hashSync(testPassword, 2),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
};

describe('POST /login', () => {
  beforeEach(async () => {
    await mongoose.connection.collections.users.insertMany(createUsers());
  });

  it('should return an error if credentials are not provided', async () => {
    await mongoose.connection.collections.users.insertOne(testUser);

    const res = await request.post('/login');
    expect(res.status).to.equal(422);
    expect(some(res.body.errors, { source: '/username' })).to.be.true;
    expect(some(res.body.errors, { source: '/password' })).to.be.true;
  });

  it('should return a user if credentials are valid', async () => {
    await mongoose.connection.collections.users.insertOne(testUser);

    const res = await request
      .post('/login')
      .send({ username: testUser.email, password: testPassword })
      .set('Content-type', 'application/json');
  
    expect(res.status).to.equal(200);
    expect(res.body.email).to.equal(testUser.email);
  });
});
