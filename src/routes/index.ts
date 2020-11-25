import { SwaggerRouter } from 'koa-swagger-decorator';
import routerV1 from './v1';

const router = new SwaggerRouter();

router.use('/api/v1', routerV1.routes());

export default router;
