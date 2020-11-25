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
    error: { appenders: ["errors"], level: 'INFO' },
    http: { appenders: ["access"], level: 'INFO' }
  }
}