const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../../config/app.json');

const SALT_ROUNDS = 3;

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

module.exports = {
  hashPassword,
  checkPassword,
  generateJwt,
};
