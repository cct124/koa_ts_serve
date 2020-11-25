import { request, summary, body, query, tags, middlewares, formData, path, description, orderAll, prefix, Context, } from 'koa-swagger-decorator';
import { Res, ResErr } from '../../../plugins/response';
import { valiBody, valiQuery, valiPath } from '../../../plugins/validate';
import { Parameters } from '../../../types'
import { Err, Regexps, Types } from '../../../config';
import formidable from 'formidable';
import _path from 'path';

const tag = tags(['User']);
const userSchema: Parameters = {
  name: {
    type: Types.Str,
    required: true,
    enum: ['jane', 'test', 'lol']
  },
  age: {
    type: Types.Int,
    minimum: 1,
  }
};

@prefix('/user')
@orderAll(1)
export default class UserRouter {
  @request('POST', '/register')
  @summary('register user')
  @description('example of api')
  @tag
  // @body(userSchema)
  @valiBody(userSchema)
  static async register(ctx: Context) {
    const { name } = ctx.request.body;
    const user = { name };
    new Res(ctx, { user });
  }

  @request('post', '/login')
  @summary('user login, password is 123456')
  @tag
  @valiBody({
    name: { type: 'string', required: true },
    info: {
      type: 'object',
      properties: {
        des: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              required: true
            },
            content: {
              type: 'string',
              required: true
            },
          }
        },
        age: {
          type: 'integer',
          required: true
        },
        phone: { type: 'number', pattern: Regexps.Phone.toString(), required: true },
      }
    },
    list: {
      type: "array",
      items: {
        type: 'string'
      }
    },
    friend: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: {
            type: 'string',
            required: true
          },
          des: {
            type: 'object',
            properties: {
              title: {
                type: 'string',
                required: true
              },
              content: {
                type: 'string',
                required: true
              },
            }
          },
          age: {
            type: 'integer',
            required: true
          },
          phone: { type: 'number', pattern: Regexps.Phone.toString(), required: true },
        }
      },
    }
  })
  static async login(ctx: Context) {
    new Res(ctx, ctx.request.body);
  }

  @request('get', '/list/{id}')
  @summary('user list')
  @valiQuery({
    page: {
      type: Types.Str,
      enum: ['1', '2'],
      description: 'page number'
    }
  })
  @valiPath({ id: { type: 'string', enum: ['1', '2'], required: true } })
  @tag
  static async getAll(ctx: Context) {
    const users = [{ name: 'foo' }, { name: 'bar' }];
    ctx.body = { users };
  }

  @request('get', '/{id}')
  @summary('get user by id')
  @tag
  @path({ id: { type: 'string', required: true } })
  static async getOne(ctx: Context) {
    const { id } = ctx.validatedParams;
    console.log('id:', id);
    const user = { name: 'foo' };
    ctx.body = { user };
  }

  @request('post', '/update')
  @summary('update file')
  @formData({
    name: {
      type: 'string',
      required: true,
    },
    file: {
      type: 'file',
      format: 'binary',
      required: true,
      description: 'upload file, get url'
    }
  })
  @tag
  static async file(ctx: Context) {
    const form = new formidable.IncomingForm();
    form.multiples = true;
    form.keepExtensions = true;
    form.maxFileSize = 1024 * 500;
    form.uploadDir = _path.resolve('temp/');

    await new Promise((resolve, reject) => {
      form.parse(ctx.req, (err, fields, files) => {
        if (err) {
          reject(err);
          return;
        }

        ctx.set('Content-Type', 'application/json');
        ctx.status = 200;
        ctx.state = { fields, files };
        ctx.body = JSON.stringify(ctx.state, null, 2);
        resolve();
      });
    }).catch(err => {
      ctx.body = err;
    });


  }

  @request('DELETE', '/{id}')
  @summary('delete user by id')
  @tag
  @path({ id: { type: 'string', required: true } })
  static async deleteOne(ctx: Context) {
    const { id } = ctx.validatedParams;
    console.log('id:', id);
    ctx.body = { msg: 'success' };
  }
}
