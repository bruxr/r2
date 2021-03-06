const mongoose = require('mongoose');

const User = mongoose.model('User', {
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  token: String,
});

module.exports = User;
