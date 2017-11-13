/**
 * 在app.user(router)之前调用
 */
const ApiError = require('../app/error/ApiError');

var response_formatter = async (ctx) => {

    //如果有返回数据
    if(ctx.body){
        ctx.body = {
            code: 0,
            message: "success",
            data: ctx.body
        }
    }else{
        ctx.body = {
            code: 0,
            message: "success"
        }
    }
}

var url_filter = function(pattern){
    return async function(ctx, next){
        var reg = new RegExp(pattern);
        try {
            //先执行路由
            await next();
        } catch (error) {
            // console.log(error);
            //如果异常类型是API异常并且通过正则验证的URL, 将错误信息添加到响应体中返回
            if (error instanceof ApiError && reg.test(ctx.originalUrl)){
                ctx.status = 200;
                ctx.body = {
                    code: error.code,
                    message: error.message
                }
            }

            //继续抛出错误, 让外层中间件处理日志
            throw error;
        }


        //通过正则的url进行格式化处理
        if(reg.test(ctx.originalUrl)){
            response_formatter(ctx);
        }
    }
}

module.exports = url_filter;