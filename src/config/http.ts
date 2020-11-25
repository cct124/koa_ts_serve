import { Error } from '../types'

export enum Status {
  /**
   * 客户端应继续其请求。
   */
  Continue = 100,
  /**
   *  成功执行了客户端请求的操作
   */
  OK = 200,
  /**
   *  成功创建了新资源
   */
  Created = 201,
  /**
   *  该请求已被接受处理，但处理尚未完成
   */
  Accepted = 202,
  /**
   * 服务器已满足请求，但不需要返回实体
   */
  No_Content = 204,
  /**
   * 所请求的资源对应于一组表示中的任何一个，每个都有自己的特定位置
   */
  Multiple_Choices = 300,
  /**
   * 所请求的资源已被分配到了一个新的URI
   */
  Moved_Permanently = 301,
  /**
   * 所请求的资源临时位于其他URI下
   */
  Found = 302,
  /**
   * 可以在不同的URI下找到对请求的响应
   */
  See_Other = 303,
  /**
   * 客户端已经执行了有条件的GET请求，并且允许访问，但是文档没有被修改
   */
  Not_Modified = 304,
  /**
   * 临时重定向
   */
  Temporary_Redirect = 307,
  /**
   * 由于语法格式错误，服务器无法理解该请求。
   */
  Bad_Request = 400,
  /**
   * 该请求需要用户认证，响应必须包括一个WWW-Authenticate头域
   */
  Unauthorized = 401,
  /**
   * 服务器理解了该请求，但拒绝执行该请求。
   */
  Forbidden = 403,
  /**
   * 服务器未找到与请求URI匹配的任何内容
   */
  Not_Found = 404,
  /**
   * 客户端尝试使用资源不允许的HTTP方法
   */
  Method_Not_Allowed = 405,
  /**
   * 服务器无法生成任何客户端的首选媒体类型
   */
  Not_Acceptable = 406,
  /**
   * 请求的资源在服务器上不再可用，并且转发地址未知
   */
  Gone = 410,
  /**
   * 不满足前提条件
   */
  Precondition_Failed = 412,
  /**
   * 不支持的媒体类型
   */
  Unsupported_Media_Type = 415,
  /**
   * 服务器遇到意外情况，阻止其满足请求
   */
  Internal_Server_Error = 500,
  /**
   * 服务器不支持满足请求所需的功能
   */
  Not_Implemented = 501,
}


export const Err: Error = {
  INVALID_PAYOAD: {
    status: Status.Bad_Request,
    msg: '参数无效'
  },
  UNAUTHORIZED: {
    status: Status.Unauthorized,
    msg: '未经授权'
  },
  FORBIDDEN: {
    status: Status.Forbidden,
    msg: '没有权限'
  },
  SERVER_ERROR: {
    status: Status.Internal_Server_Error,
    msg: '内部服务器错误'
  }
}

