import { Next, Context } from 'koa';
import { logAccess } from '../plugins/utils';
import { logError } from '../plugins/log4js';
import { ResErr } from '../plugins/response';
import { Err, Status } from '../config';


// 错误处理中间件
export async function onerror(ctx: Context, next: Next) {
  try {
    // 请求进入记录时间
    ctx.resStartTime = new Date();
    await next();
    // 请求结束写入日记
    logAccess(ctx);
  } catch (error) {
    if (error.status === Status.Bad_Request) {
      console.log(error);

      new ResErr(ctx, {
        error: Err.INVALID_PAYOAD,
        detail: error
      });
    } else {
      // 服务错误进入这里
      new ResErr(ctx, {
        error: Err.SERVER_ERROR,
        detail: error
      });
    }

    logAccess(ctx);
    logError.error(error);
  }
}
