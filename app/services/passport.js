const bcrypt = require('bcrypt');
const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy(async (username, password, done) => {
  const user = await User.findOne({ email: username }).exec();
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      done(null, user);
    } else {
      done(null, false);
    }
  } else {
    done(null, false);
  }
}));

module.exports = passport;
