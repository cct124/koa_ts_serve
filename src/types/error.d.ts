import { Status } from '../config/index';

export interface ErrMsg {
  status: Status,
  msg: string
}

export interface Error {
  /**
   * 400 参数无效
   */
  INVALID_PAYOAD: ErrMsg;
  /**
   * 401 未经授权
   */
  UNAUTHORIZED: ErrMsg;
  /**
   * 403 没有权限
   */
  FORBIDDEN: ErrMsg;
  /**
   * 500 内部服务器错误
   */
  SERVER_ERROR: ErrMsg;
}

export interface ResErrMsg {
  error: ErrMsg,
  detail: any,
}