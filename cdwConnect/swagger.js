import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";


const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'My Express API',
        version: '1.0.0',
        description: 'API documentation for my Express application',
      },
      components: {
        securitySchemes: {
          ApiKeyAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'x-auth-token',
          },
        },
      },
      servers: [
        {
          url: 'http://localhost:4000',
        },
      ],
    },
    apis: ['./routers/*.js'],
  };
  
  const swaggerSpec = swaggerJSDoc(options);
  
  function setupSwagger(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }
  
export default  setupSwagger;
  

