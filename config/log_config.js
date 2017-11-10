var path = require('path');

// //日志根目录
// var baseLogPath = path.resolve(__dirname, '../logs');

// //错误日志目录
// var errorPath = '/error';
// //错误日志文件名
// var errorFileName = 'error';
// //错误日志输出完整路径
// var errorLogPath = baseLogPath + errorPath + '/' + errorFileName;
var errorLogPath = path.resolve(__dirname, '../logs/error/error');

// //响应日志目录
// var resPath = '/response';
// //响应日志文件名
// var resFileName = 'response';
// //响应日志输出完整路径
// var responseLogPath = baseLogPath + resPath + '/' + resFileName;
var responseLogPath = path.resolve(__dirname, '../logs/response/response');

module.exports = {
    "appenders": {
        //错误日志
        "errorLogger": {
            //"category": "errorLogger", //logger名称
            "type": "dateFile", //日志类型
            "filename": errorLogPath, //日志输出位置
            "encoding": "utf-8", //编码格式
            "alwaysIncludePattern": true, //是否总是有后缀名
            "pattern": "-yyyy-MM-dd-hh.log", //后缀, 每小时创建一个新的日志文件
            //"path": errorPath   //自定义属性,错误日志根目录
        },
        //响应日志
        "resLogger": {
            //"category": "resLogger", 
            "type": "dateFile",
            "filename": responseLogPath,
            "encoding": "utf-8", //编码格式
            "alwaysIncludePattern": true,
            "pattern": "-yyyy-MM-dd-hh.log",
            //"path": resPath
        }
    },
    "categories": {//设置logger名称对应的日志等级
        "default": {"appenders": ["resLogger"], "level": "ALL"},
        "errorLogger": {"appenders": ["errorLogger"], "level": "ERROR"},
        "resLogger": {"appenders": ["resLogger"], "level": "ALL"}
    }
}