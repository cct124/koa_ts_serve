import { SwaggerRouter as Swagger } from 'koa-swagger-decorator';
import { IRouterOptions } from 'koa-router';
import { SwaggerOptions } from '../types';
import { Env } from '../config';
import { Serve } from '../config';
import { logConsole } from './log4js';



/**
 * 继承自koa-swagger-decorator的SwaggerRouter类，swagger方法会根据env变量判断是否生成swagger文档
 */
export class SwaggerRouter<StateT = any, CustomT = {}> extends Swagger {
  constructor(opts?: IRouterOptions, swaggerOpts?: SwaggerOptions) {
    super(opts, swaggerOpts)
  }

  swagger(options: SwaggerOptions = {}) {
    if (process.env.NODE_ENV === Env.Dev) {      
      logConsole.info(`swagger docs avaliable at http://localhost:${Serve.port}${options.prefix}${options.swaggerHtmlEndpoint}`)
      super.swagger(options)
    }
  }
}

/**
 * 继承于正则对象，添加toSting()函数
 */
export class Pattern extends RegExp {
  /**
   * @param pattern 正则表达式或字符串
   */
  constructor(pattern: RegExp | string) {
    super(pattern)
  }

  /**
   * 返回一个值为当前正则表达式对象的模式文本的字符串及标志字符，该字符串不会包含正则字面量两边的斜杠
   */
  toString(): string {
    return this.source + (this.flags ? ' ' + this.flags : '');
  }
}