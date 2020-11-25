import { Pattern } from "../plugins/class"

export const Regexps = {
  /**
   * 手机号码
   */
  Phone: new Pattern(/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/g),
  /**
   * 不能为负数
   */
  Pos_Num: new Pattern(/^\d/g),
}

