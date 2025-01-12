const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ParkingService API",
      version: "1.0.0",
      description: "API documentation for the ParkingService microservice",
    },
    servers: [
      {
        url: "http://localhost:5001",
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
