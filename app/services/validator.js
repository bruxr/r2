const koaValidator = require('koa-async-validator');

const middleware = koaValidator();

const validate = (rules) => {
  return async (ctx, next) => {
    ctx.checkBody(rules);
    const errors = await ctx.validationErrors();
    if (errors) {
      ctx.body = { errors };
      ctx.status = 400;
    } else {
      await next();
    }
  };
};

module.exports = {
  validate,
  middleware,
};
