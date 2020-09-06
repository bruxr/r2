const koaValidator = require('koa-async-validator');

const middleware = koaValidator();

const validate = (rules) => {
  return async (ctx, next) => {
    ctx.checkBody(rules);
    const errors = await ctx.validationErrors();
    if (errors) {
      ctx.body = {
        errors: errors.map((error) => ({
          source: `/${error.param}`,
          title: 'Invalid Param',
          detail: error.msg,
        })),
      };
      ctx.status = 422;
    } else {
      await next();
    }
  };
};

module.exports = {
  validate,
  middleware,
};
