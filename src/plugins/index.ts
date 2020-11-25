import Koa from 'koa';
import koaBody from 'koa-bodyparser';
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

// 按照顺序执行导出的函数
export default [ intercept, useRouter]