const Router = require('koa-router');

const passport = require('../services/passport');

const router = new Router();

router.post('/login', async (ctx, next) => {
  return passport.authenticate('local', (err, user) => {
    if (user) {
      ctx.body = user;
      return ctx.login(user);
    } else {
      ctx.body = { error: 'Invalid credentials.' };
      ctx.throw(400);
    }
  })(ctx);
  await next();
});

module.exports = router;
