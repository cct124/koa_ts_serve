import { body, middlewares, query, path } from 'koa-swagger-decorator';
import { Context, Next } from 'koa';
import { Validate } from './check';
import { ResErr } from '../response';
import { Err } from '../../config';
import { Parameters } from '../../types';


/**
 *  在生成请求体文档的同时将注册数据验证中间件，使用此装饰器的接口会验证请求数据是否符合文档要求，不符合将返回 400 参数无效错误
 * @param parameters 描述的body对象
 */
export const valiBody = (parameters: Parameters) => (
  target: any,
  name: string,
  descriptor: PropertyDescriptor
) => {
  body(parameters)(target, name, descriptor);
  useMiddlewares(descriptor, validateBody(parameters, 'body'))
}

/**
 *  在生成查询接口文档的同时将注册数据验证中间件，使用此装饰器的接口会验证请求数据是否符合文档要求，不符合将返回 400 参数无效错误
 * @param parameters 描述的query对象
 */
export const valiQuery = (parameters: Parameters) => (
  target: any,
  name: string,
  descriptor: PropertyDescriptor
) => {
  query(parameters)(target, name, descriptor);
  useMiddlewares(descriptor, validateBody(parameters, 'query'))
}

/**
 *  在生成路径参数接口文档的同时将注册数据验证中间件，使用此装饰器的接口会验证请求数据是否符合文档要求，不符合将返回 400 参数无效错误
 * @param parameters 描述的path对象
 */
export const valiPath = (parameters: Parameters) => (
  target: any,
  name: string,
  descriptor: PropertyDescriptor
) => {
  path(parameters)(target, name, descriptor);
  useMiddlewares(descriptor, validateBody(parameters, 'path'))
}

export function useMiddlewares(descriptor: PropertyDescriptor, validate: Function) {
  if (descriptor.value.middlewares) {
    descriptor.value.middlewares.push(validate)
  } else {
    descriptor.value.middlewares = [validate]
  }
}

/**
 * 验证请求数据
 * @param parameters 文档对象
 */
export const validateBody = (parameters: Parameters, key: string) => async (ctx: Context, next: Next) => {

  const data: {
    [key: string]: any
  } = {
    query: ctx.request.query,
    body: ctx.request.body,
    path: ctx.params,
  }

  const validate = new Validate(parameters, data[key]).check().errField;
  if (Object.keys(validate).length != 0) {
    return new ResErr(ctx, {
      error: Err.INVALID_PAYOAD,
      detail: validate
    })
  }

  await next()
}