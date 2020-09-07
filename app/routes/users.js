const bcrypt = require('bcrypt');
const { omit } = require('lodash');
const jwt = require('jsonwebtoken');
const Router = require('koa-router');

const User = require('../models/user');
const config = require('../../config/app.json');
const passport = require('../services/passport');
const validator = require('../services/validator');

const router = new Router();

router.post('/login',
  validator.validate({
    username: {
      notEmpty: true,
      isEmail: true,
    },
    password: {
      notEmpty: true,
    },
  }),
  (ctx) => {
    return passport.authenticate('local', { session: false }, async (err, user) => {
      if (user) {
        user.token = jwt.sign({ userId: user._id }, config.appSecret);
        user.save();

        ctx.body = omit(user.toJSON(), ['password']);
        return ctx.login(user);
      } else {
        ctx.body = { error: 'Invalid credentials.' };
        ctx.throw(400);
      }
    })(ctx);
  },
);

router.post('/register',
  validator.validate({
    email: {
      notEmpty: true,
      isEmail: true,
    },
    password: {
      notEmpty: true,
    },
    firstName: {
      notEmpty: true,
    },
    lastName: {
      notEmpty: true,
    },
  }),
  async (ctx, next) => {
    const { email, password, firstName, lastName } = ctx.request.body;
    const user = await User.create({
      email,
      password: bcrypt.hashSync(password, 2),
      firstName,
      lastName,
    });

    ctx.body = omit(user.toJSON(), ['password']);
    await next();
  },
);

module.exports = router;
