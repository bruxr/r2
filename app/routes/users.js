const _ = require('lodash');
const bcrypt = require('bcrypt');
const Router = require('koa-router');

const User = require('../models/user');
const passport = require('../services/passport');

const router = new Router();

router.post(
  '/login',
  async (ctx, next) => {
    ctx.checkBody({
      username: {
        notEmpty: true,
        isEmail: true,
      },
      password: {
        notEmpty: true,
      },
    });
    const errors = await ctx.validationErrors();
    if (errors) {
      ctx.body = { errors };
      ctx.status = 400;
    } else {
      await next();
    }
  },
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

router.post(
  '/register',
  async (ctx, next) => {
    ctx.checkBody({
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
    });
    const errors = await ctx.validationErrors();
    if (errors) {
      ctx.body = { errors };
      ctx.status = 400;
    } else {
      await next();
    }
  },
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
