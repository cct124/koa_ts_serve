import { SwaggerRouter } from '../../plugins/class';
import { Swagger_Config } from '../../config'

const router = new SwaggerRouter();

router.swagger({
  ...Swagger_Config,
  title: 'user api',
  description: '用户相关接口api',
  version: '1.0.0',
  prefix: '/api/v1',
});

router.mapDir(__dirname, {
  doValidation: false, // 关闭验证
});

export default router