import { Types } from '../../config'
import { Expect, ErrField, Parameters } from '../../types';

/**
 * 验证请求参数
 */
export class Validate {
  parameters;
  data;
  errField: ErrField = {};
  fns = [this.default, this.required, this.type, this.enum, this.pattern, this.threshold];

  /**
   * 验证请求参数
   * @param parameters 文档对象
   * @param data 请求体
   */
  constructor(parameters: Parameters, data: any) {
    this.parameters = parameters;
    this.data = data;
  }

  check() {
    for (const [key, expect] of Object.entries(this.parameters)) {
      this.checkPara(expect, key)
    }

    return this;
  }

  checkPara(expect: Expect, key: string) {
    for (const fn of this.fns) {
      // if (fn.apply(this, [expect, key, this.data]) === false) return false
      if (fn.apply(this, [expect, key, this.data]) === false) return false;
    }
  }

  isType(value: any): string {
    return Object.prototype.toString.call(value).match(/\s[a-zA-Z]+/g)[0].trim().toLocaleLowerCase()
  }

  add(key: string, msg: any) {
    this.errField[key] = msg
  }

  push(key: string, msg: any, index: string) {
    if (msg[index] !== undefined) {
      if (this.errField[key] === undefined) {
        this.errField[key] = {
          [index]: msg[index]
        };
      } else {
        this.errField[key][index] = msg[index];
      }
    }

  }

  default(expect: Expect, key: string, data: any) {
    if (expect.default && data[key] === undefined) {
      data[key] = expect.default
    }
    return true
  }

  required(expect: Expect, key: string, data: any) {
    if (expect.required === undefined && data[key] === undefined) return false
    if (expect.required && (data[key] === undefined || data[key] === "")) {
      this.add(key, '字段是必须的')
      return false
    }
  }

  type(expect: Expect, key: string, data: any) {
    const type = this.isType(data[key]);
    const msg = `字段值类型错误，期望是${expect.type}，现在是${type}`;
    switch (expect.type) {
      case Types.Str:
        if (type !== Types.Str) {
          this.add(key, msg)
          return false
        }
        break;
      case Types.Num:
        if (type !== Types.Num) {
          this.add(key, msg)
          return false
        }
        break;
      case Types.Int:
        if (type !== Types.Num || !Number.isInteger(data[key])) {
          this.add(key, msg)
          return false
        }
        break;
      case Types.Bool:
        if (type !== Types.Bool) {
          this.add(key, msg)
          return false
        }
        break;
      case Types.Arr:
        if (type !== Types.Arr) {
          this.add(key, msg)
          return false
        } else {
          this.array(expect, key, data);
        }
        break;
      case Types.Obj:
        if (type !== Types.Obj) {
          this.add(key, msg)
          return false
        } else {
          this.object(expect, key, data)
        }
        break;
      default:
        throw new Error("文档规定的字段值类型不在枚举Types中，这可能是编写文档时规定了错误的字段类型");
    }
  }

  enum(expect: Expect, key: string, data: any) {
    if (Array.isArray(expect.enum) && expect.enum.length && !expect.enum.includes(data[key])) {
      this.add(key, `字段值不在枚举中`)
      return false
    }
  }

  pattern(expect: Expect, key: string, data: any) {
    if (expect.pattern) {
      const patterns = expect.pattern.split(' ').map((pat: string) => pat.trim());
      const regexp = new RegExp(patterns[0], patterns[1]);
      if (!regexp.test(data[key])) {
        this.add(key, `字段值未通过正则表达式验证`)
        return false
      }
    }
  }

  array(expect: Expect, key: string, data: any) {
    if (expect.items) {
      data[key].forEach((item: any, index: number) => {
        const validate = new Validate(expect, data);
        validate.type(expect.items, index.toString(), data[key])
        this.push(key, validate.errField, index.toString());
      });
    }
  }

  object(expect: Expect, key: string, data: any) {
    if (expect.properties) {
      const field = new Validate(expect.properties, data[key]).check().errField;
      if (Object.keys(field).length != 0) {
        this.add(key, field)
      }
    }
  }

  /**
   * 验证maximum以及minimum
   */
  threshold(expect: Expect, key: string, data: any) {
    if (!isNaN(expect.maximum)) {
      if (expect.maximum < data[key]) {
        this.add(key, `字段值大于规定的最大值`)
      }
    }
    if (!isNaN(expect.minimum)) {
      if (expect.minimum > data[key]) {
        this.add(key, `字段值小于规定的最小值`)
      }
    }
  }

}