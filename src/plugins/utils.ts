import path from 'path';
import { IncomingMessage } from 'http';
import { Context } from 'koa';
import { Status } from '../config';
import { logHttp } from '../plugins/log4js';

/**
 * 执行目录中的ts文件
 * @param {string} dire 存放ts文件的目录路径 
 * @param {string[]} plugins 中间件的文件名
 * @return {Function} 闭包函数，传入参数执行导出的函数
 */
export function koaUseMiddlewares(dire: string, plugins: string[]): Function {

  const middleware: { default: Function[] }[] = plugins.map(i => `${dire}/${i}`).map(file => require(path.resolve(__dirname, file)));
  return function () {
    middleware.forEach(mode => {
      mode.default.forEach(fn => {
        fn(...arguments)
      });
    })
  }
}

/**
 * 获取用户 ip 地址
 * @param req - Node 的 request 对象.
 */
export function getClientIP(req: IncomingMessage) {
  return req.headers['x-real-ip'] ||
    req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
    req.connection.remoteAddress || // 判断 connection 的远程 IP
    req.socket.remoteAddress //|| // 判断后端的 socket 的 IP
  // req.connection.socket.remoteAddress;
};

/**
 * 记录http请求
 * @param ctx - koa的ctx对象
 */
export function logAccess(ctx: Context) {
  logger(ctx.status, httpLog(ctx))
}

/**
 * 输入状态码，返回日记函数
 * @param status - http 状态码
 */
export function logger(status: Status, msg: string) {
  switch (Math.floor(status / 100) * 100) {
    case Status.Continue:
      logHttp.info(msg)
      break;
    case Status.OK:
      logHttp.info(msg)
      break;
    case Status.Multiple_Choices:
      logHttp.info(msg)
      break;
    case Status.Bad_Request:
      logHttp.warn(msg)
      break;
    case Status.Internal_Server_Error:
      logHttp.error(msg)
      break;
    default:
      logHttp.error(msg)
      break;
  }
}

/**
 * http 日记记录
 * @param ctx - koa的ctx对象
 * @return 返回 log 
 */
export function httpLog(ctx: Context): string {
  ctx.resEndTime = new Date();
  ctx.resTime = ctx.resEndTime - ctx.resStartTime;
  return `${getClientIP(ctx.req)} - ${ctx.resTime} ${ctx.request.method} ${ctx.request.url} ${ctx.status}${(ctx.body && ctx.status >= Status.Bad_Request) ? ' - ' + ctx.body.error + ' ' + JSON.stringify(ctx.body.detail) : ''} - ${ctx.request.header.host} ${ctx.request.header['user-agent']}`;
}

/**
 * 获取本机ip
 */
export function getIPAdress() {
  let interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      let alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address
      }
    }
  }
}
