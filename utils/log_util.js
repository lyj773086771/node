var log4js = require('log4js');
var log_config = require('../config/log_config');

//加载配置文件
log4js.configure(log_config);

var logUtil = {};

var errorLogger = log4js.getLogger('errorLogger');
var resLogger = log4js.getLogger('resLogger');

//封装错误日志
logUtil.logErroe = function(ctx, error, resTime){
    if (ctx && error){
        errorLogger.error(formatError(ctx, error, resTime));
    }
};

//封装响应日志
logUtil.logResponse = function(ctx, resTime){
    if(ctx){
        resLogger.info(formatRes(ctx, resTime));
    }
};

//格式化响应日志
var formatRes = function(ctx, resTime){
    let logText = new String();

    //响应日志开始
    logText += "\n" + "*************** response log start ***************" + "\n";

    //添加请求日志
    logText += formatReqLog(ctx, request, resTime);

    //响应状态码
    logText += "response body：" + "\n" + JSON.stringify(ctx.body) + "\n";

    //响应日志结束
    logText += "*************** response log end ***************" + "\n";
    return logText;
}

//格式化错误日志
var formatError = function(ctx, err, resTime){
    let logText = new String();

    //错误信息开始
    logText += "\n" + "*************** error log start ***************" + "\n";

    //添加请求日志
    logText += formatReqLog(ctx, request, resTime);

    //错误名称
    logText += "err name：" + err.name + "\n";

    //错误信息
    logText += "err message：" + err.message + '\n';

    //错误详情
    logText += "err stack：" + err.stack + '\n';

    //错误信息结束
    logText += "*************** error log end ***************" + "\n";

    return logText;
};

//格式化请求日志
var formatReqLog = function(req, resTime){
    let logText = new String();

    //访问方法
    logText += "request method：" + req.method + "\n";

    //请求原始地址
    logText += "request originalUrl：" + req.originalUrl + "\n";

    //客户端IP
    logText += "request client ip：" + req.ip + "\n";

    //请求参数
    if(method === "GET"){
        //开始时间
        logText += "request start time：" + req.query.requestStartTime + "\n";

        //请求参数
        logText += "request query：" + JSON.stringify(req.query) + "\n";
    }else {
        logText += "request start time：" + req.body.requestStartTime + "\n";

        logText += "request body：" + JSON.stringify(req.body) + "\n";
    }

    //服务器响应时间
    logText += "response time：" + resTime + "\n";

    return logText;
}

module.exports = logUtil;