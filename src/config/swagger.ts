import { SwaggerOptions } from '../types'

export const Swagger_Config: SwaggerOptions = {

  // [optional] default is /swagger
  swaggerHtmlEndpoint: '/swagger',

  // [optional] default is /swagger-json
  swaggerJsonEndpoint: '/swagger-json',

  // [optional] additional options for building swagger doc
  // eg. add api_key as shown below
  swaggerOptions: {
    securityDefinitions: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization'
      }
    }
  },
  swaggerConfiguration: {
    display: {
      defaultModelsExpandDepth: 4,
      defaultModelExpandDepth: 3,
      docExpansion: 'list',
      defaultModelRendering: 'model'
    },
    swaggerVersion: '3.36.2'
  }
}
