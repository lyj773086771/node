const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')();
const views = require('koa-views')
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const logUtil = require('./utils/log_util')

const index = require('./routes/index')
const users = require('./routes/users')


// error handler
onerror(app)

// middlewares
app.use(convert(bodyparser()));
app.use(convert(json()));
app.use(convert(logger()))
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
/*app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})*/
app.use(async (ctx, next) => {
  //响应开始时间
  const start = new Date();
  //响应间隔时间
  var ms;
  try{
    //开始进入到下一个中间件
    await next();

    ms = new Date() - start;
     
    // throw new error("first error");
    //记录响应日志
    logUtil.logResponse(ctx, ms);
  }catch(error){
    ms = new Date() - start;
    //记录异常日志
    logUtil.logError(ctx, error, ms);
  }

});

router.use('/', index.routes(), index.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());

// routes
app.use(router.routes(), index.allowedMethods())
// app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
