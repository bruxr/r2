const faker = require('faker');
const bcrypt = require('bcrypt');

const users = () => ([
  {
    email: faker.internet.email(),
    password: bcrypt.hashSync(faker.internet.password(), 2),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  },
  {
    email: faker.internet.email(),
    password: bcrypt.hashSync(faker.internet.password(), 2),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  },
]);

module.exports = users;
