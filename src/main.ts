import Koa from 'koa';
import log4js from 'log4js';
import { Log4jsConfig } from './config';
import { logConsole } from './plugins/log4js';
import { Serve } from './config';
import { koaUseMiddlewares } from './plugins/utils';

const app = new Koa();

// 载入log4js配置
log4js.configure(new Log4jsConfig(process.env.NODE_ENV))

// 执行plugins文件夹下的index.ts文件注册中间件
koaUseMiddlewares(Serve.dire, Serve.plugins)(app);

app.listen(Serve.port, Serve.host);

logConsole.info(`Server listening on http://${Serve.host}:${Serve.port} mode`);


