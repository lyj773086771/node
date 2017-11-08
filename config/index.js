var development_env = require('./development');
var test_env = require('./test');

console.log('deve:', development_env);
console.log('test:', test_env);

//根据不同的NODE_ENV,输出不同搞的配置对象, 默认输出development配置对象
module.exports = {
    development: development_env,
    test: test_env
}[process.env.NODE_ENV || 'development']