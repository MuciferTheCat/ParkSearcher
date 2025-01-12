const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SearchService API",
      version: "1.0.0",
      description: "API documentation for the SearchService microservice",
    },
    servers: [
      {
        url: "http://localhost:5003",
      },
    ],
  },
  apis: ["./swagger.yaml"], // Adjust path if needed
};

const specs = swaggerJsDoc(options);

module.exports = {
  swaggerUi,
  specs,
};