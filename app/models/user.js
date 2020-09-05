const mongoose = require('../services/mongoose');

const User = mongoose.model('User', {
  email: String,
  password: String,
  firstName: String,
  lastName: String,
});

module.exports = User;
