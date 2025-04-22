import swaggerJSDoc from "swagger-jsdoc";
import path from "node:path";

const swaggerDefinition = {
    openapi: "3.1.0",
    info: {
        title: "MAU web technologies server",
        version: "1.0.0",
        description: "API documentation for my server",
    }
};

const options = {
    swaggerDefinition,
    apis: [path.resolve(__dirname, "../routes/*.ts")],
};

const swaggerSpec = swaggerJSDoc(options);

export default { swaggerSpec };
