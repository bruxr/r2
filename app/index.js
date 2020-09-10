const Koa = require('koa');
const passport = require('koa-passport');
const bodyParser = require('koa-bodyparser');

const usersRouter = require('./routes/users');
const { setupAuth } = require('./services/auth');
const validator = require('./services/validator');

setupAuth();

const app = new Koa();

app.use(bodyParser());
app.use(validator.middleware);
app.use(passport.initialize());

app.use(usersRouter.routes())
   .use(usersRouter.allowedMethods());

module.exports = app;
