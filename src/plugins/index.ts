import Koa from 'koa';
import koaBody from 'koa-bodyparser';
import log4js from 'log4js';
import { Log4js_Config } from '../config';
import router from '../routes';
import { onerror } from '../middlewares';

function intercept(app: Koa) {
  app.use(onerror);
}

function useRouter(app: Koa) {
  app.use(koaBody())
    .use(router.routes())
    .use(router.allowedMethods());
}

function log() {
  log4js.configure(Log4js_Config)
}

// 按照顺序执行导出的函数
export default [log, intercept, useRouter]