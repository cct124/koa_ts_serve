import { SwaggerOptions as swagger } from 'koa-swagger-decorator/dist/wrapper';

export interface SwaggerOptions extends swagger {
  swaggerConfiguration?: {
    display?: any,
    swaggerVersion?: string
  }
}