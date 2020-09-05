const Router = require('koa-router');

const router = new Router();

router.post('/login', (ctx) => {
  const { email } = ctx.request.body;

  ctx.body = {
    id: 1,
    email,
    firstName: 'Test',
    lastName: 'User',
    token: 'test',
  };
});

module.exports = router;
