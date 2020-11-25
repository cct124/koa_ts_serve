import log4js from 'log4js';
import { Env } from './const';

export const Log4js_Config = {
  appenders: {
    access: {
      type: 'dateFile', filename: 'log/access.log', pattern: '.yyyy.MM.dd.log', daysToKeep: 60, category: 'http'
    },
    app: {
      type: 'file', filename: 'log/app.log', maxLogSize: 10485760, numBackups: 3
    },
    console: {
      type: 'stdout'
    },
    errorFile: {
      type: 'file', filename: 'log/errors.log', maxLogSize: 10485760, numBackups: 3
    },
    errors: {
      type: 'logLevelFilter', level: 'ERROR', appender: 'errorFile'
    }
  },
  categories: {
    default: { appenders: ["app", "errors", "console"], level: 'DEBUG' },
    console: { appenders: ["app", "console"], level: 'INFO' },
    error: { appenders: ["errors", "console"], level: 'INFO' },
    http: { appenders: ["access", "console"], level: 'INFO' }
  }
}

export class Log4jsConfig {
  private default = Log4js_Config;

  private pro = {
    categories: {
      default: { appenders: ["app", "errors",], level: 'DEBUG' },
      console: { appenders: ["app", "console"], level: 'INFO' },
      error: { appenders: ["errors",], level: 'INFO' },
      http: { appenders: ["access",], level: 'INFO' }
    }
  }

  private env;

  appenders;

  categories;


  constructor(env: string, proConfig?: log4js.Configuration, defConfig?: log4js.Configuration) {
    this.env = env;

    if (this.env === Env.Pro) {
      this.appenders = proConfig && proConfig.appenders ? proConfig.appenders : this.default.appenders;
      this.categories = proConfig && proConfig.categories ? proConfig.categories : this.pro.categories;
    } else if (this.env === Env.Dev) {
      this.appenders = defConfig && defConfig.appenders ? defConfig.appenders : this.default.appenders;
      this.categories = defConfig && defConfig.categories ? defConfig.categories : this.default.categories;
    }
  }
}