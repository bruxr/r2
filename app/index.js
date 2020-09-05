const Koa = require('koa');
const passport = require('koa-passport');
const bodyParser = require('koa-bodyparser');

require('./services/passport');
const usersRouter = require('./routes/users');

const app = new Koa();

app.use(bodyParser());
app.use(passport.initialize());

app.use(usersRouter.routes())
   .use(usersRouter.allowedMethods());

module.exports = app;
