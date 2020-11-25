# koa_ts_serve
基于koa和TypeScript的node服务，引入[koa-swagger-decorator][k_s_d]用装饰器的方式编写接口文档。

## production

```bash
npm run satrt
```

## development 

```bash
npm run dev
```

## 请求数据验证
关闭了[koa-swagger-decorator][k_s_d]原本的验证方式，在plugins的[validate][vali]文件夹下面导出三个验证装饰器，具体使用方法参考[routes][user]下面的接口示例

[k_s_d]:https://github.com/Cody2333/koa-swagger-decorator "koa-swagger-decorator"
[vali]:/src/plugins/validate/index.ts "koa-swagger-decorator"
[user]:/src/routes/v1/user/index.ts "koa-swagger-decorator"
