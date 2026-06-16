const swaggerJSDOC = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi:"3.0.0",
        info:{
            title:"Ecommerce API",
            version:"1.0.2",
            description:"API que sirve para crear un ecommerce al estilo de mercadolibre"
        }

    },
    apis: [
        "./src/routes/*.route.js",
        "./src/models/*.model.js"
      ],
    
}

const swaggerSpec = swaggerJSDOC(options);

const swaggerDocs = (app, port) => {
    //documentation route
    app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    //Docs on JSON format
    app.get("api/v1/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec)
    });
    console.log(`Documentation available in http://${process.env.HOST}:${port}/api/v1/docs`)
}

module.exports = swaggerDocs
