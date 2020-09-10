const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('koa-passport');
const passportJwt = require('passport-jwt');
const CustomStrategy = require('passport-custom').Strategy;

const User = require('../models/user');
const config = require('../../config/app.json');

const { Strategy: JwtStrategy, ExtractJwt } = passportJwt;

const SALT_ROUNDS = 3;
let strategy = 'jwt';
let testUser = null;

/**
 * Setups authentication using Passport.
 */
function setupAuth() {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use('jwt', new JwtStrategy({
    secretOrKey: config.appSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
  }, (req, payload, done) => {
    User.findById(payload.userId).then((user) => {
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    }, (err) => {
      done(err);
    });
  }));

  passport.use('test', new CustomStrategy((req, done) => {
    console.log(testUser);
    done(null, testUser);
  }));
}

/**
 * Generates a hash from the provided password string.
 * 
 * @param {string} password 
 * @returns password hash
 */
function hashPassword(password) {
  return bcrypt.hashSync(password, SALT_ROUNDS);
}

/**
 * Validates if an input password is equal to the hashed password.
 * 
 * @param {string} input 
 * @param {string} hashed 
 * @returns TRUE if input is equal to the hashed password
 */
function checkPassword(input, hashed) {
  return bcrypt.compareSync(input, hashed);
}

/**
 * Generates a JWT from a user.
 * 
 * @param {Document} user 
 * @returns JWT string
 */
function generateJwt(user) {
  return jwt.sign({ userId: user._id }, config.appSecret);
}

/**
 * Authentication middleware that takes into account
 * the current auth strategy.
 * 
 * @returns a middleware that wraps passport.authenticate
 */
function authenticate() {
  return (ctx, next) => passport.authenticate(strategy)(ctx, next);
}

/**
 * Forces a user to be logged-in always. Used for testing.
 * 
 * @param {User} user
 */
function loginAs(user) {
  testUser = user;  
  strategy = 'test';
}

/**
 * Removes forced login.
 */
function resetLogin() {
  testUser = null;
  strategy = 'jwt';
}

module.exports = {
  passport,
  setupAuth,
  hashPassword,
  checkPassword,
  generateJwt,
  authenticate,
  loginAs,
  resetLogin,
};
