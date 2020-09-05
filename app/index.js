const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const usersRouter = require('./routes/users');

const app = new Koa();

app.use(bodyParser());

app.use(usersRouter.routes())
   .use(usersRouter.allowedMethods());

module.exports = app;
