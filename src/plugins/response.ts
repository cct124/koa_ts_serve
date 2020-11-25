import { Status } from '../config';
import { ResErrMsg } from '../types';
import { Context } from 'koa';




export class Response {
  context: Context;
  status: Status;

  constructor(context: Context, status: Status) {
    this.context = context;
    this.status = status;
  }
}

export class Res extends Response {
  data: any;

  constructor(context: Context, data: any, status = Status.OK) {
    super(context, status);
    this.data = data;
    this.ok();
  }

  ok() {
    this.context.status = this.status;
    this.context.body = this.data;
  }
}


export class ResErr extends Response {
  error: ResErrMsg;
  constructor(context: Context, error: ResErrMsg) {
    super(context, error.error.status);
    this.error = error;
    this.err();
  }

  err() {
    this.context.status = this.status;
    this.context.body = {
      error: this.error.error.msg,
      detail: this.error.detail
    }
  }
}

