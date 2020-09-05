const _ = require('lodash');
const bcrypt = require('bcrypt');
const Router = require('koa-router');

const User = require('../models/user');
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
  async (ctx, next) => {
    return passport.authenticate('local', { session: false }, (err, user) => {
      if (user) {
        ctx.body = _.omit(user.toJSON(), ['password']);
        return ctx.login(user);
      } else {
        ctx.body = { error: 'Invalid credentials.' };
        ctx.throw(400);
      }
    })(ctx);
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
      password: bcrypt.hashSync(password, 2),
      firstName,
      lastName,
    });

    ctx.body = _.omit(user.toJSON(), ['password']);
    await next();
  },
);

module.exports = router;
