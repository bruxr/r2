const { omit } = require('lodash');
const Router = require('koa-router');

const User = require('../models/user');
const validator = require('../services/validator');
const { authenticate, hashPassword, checkPassword, generateJwt } = require('../services/auth');

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
  async (ctx, next) => {
    const { username, password } = ctx.request.body;
    const user = await User.findOne({ email: username });
    if (user && checkPassword(password, user.password)) {
      user.token = generateJwt(user);
      user.save();

      ctx.body = omit(user.toJSON(), ['password']);
    } else {
      ctx.status = 400;
      ctx.body = {
        errors: [{
          source: '/',
          title: 'Invalid credentials',
          detail: 'Invalid username and password.',
        }],
      };
    }
    await next();
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
      password: hashPassword(password),
      firstName,
      lastName,
    });

    ctx.status = 201;
    ctx.body = omit(user.toJSON(), ['password']);
    await next();
  },
);

router.get('/me',
  authenticate(),
  async (ctx, next) => {
    ctx.body = ctx.state.user;
    await next();
  },
);

module.exports = router;
