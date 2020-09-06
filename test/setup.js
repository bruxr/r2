const mongoose = require('mongoose');
const { valuesIn } = require('lodash');
const { before, after, beforeEach } = require('mocha');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongod = new MongoMemoryServer();

before(async () => {
  const uri = await mongod.getConnectionString();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
  });
});

after(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
});

beforeEach(async () => {
  const promises = [];
  valuesIn(mongoose.connection.collections).forEach((collection) => {
    promises.push(collection.deleteMany());
  });
  await Promise.all(promises);
});
