const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bloggify - APIs",
      description:
        "API endpoints for a bloggify web application documented on swagger",
      contact: {
        name: "Divyanshu Prasad",
        url: "https://divyanshuprasad.dev/",
      },
      version: "1.0.0",
    },
    tags: [
      {
        name: "Auth",
        description: "Operations related to user authentication",
      },
      {
        name: "Upload",
        description: "Upload blog cover images to cloudinary",
      },
      {
        name: "Blogs",
        description: "Operations related to blogs",
      },
      {
        name: "Comments",
        description: "Operations related to comments",
      },
    ],
    components: {
      securitySchemes: {
        apiKeyAuth: { 
          type: "apiKey",
          in: "header", 
          name: "Authorization", 
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};
const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(`Swagger docs setup on port ${port}`);
}

module.exports = swaggerDocs;
