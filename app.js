require('dotenv').config();
// Import
const OpenApiValidator = require("express-openapi-validator");
const swaggerUi = require("swagger-ui-express");
const yaml = require("yaml");
const fs = require("fs");

const express = require('express');
const databaseMiddleware = require('./middleware/database-middleware.js');
const authMiddleware = require('./middleware/authentication-middleware.js');
const authRouter = require('./routes/auth-router.js');
const transferRouter = require('./routes/transfer-router.js');

const app = express();

app.use(express.json());
app.use(databaseMiddleware);

app.get('/', (req, res) => {
  res.send('Week 10 Assignment - Alyuza Satrio Prayogo')
})

app.use('/auth', authRouter)
app.use('/transfers', authMiddleware, transferRouter)

// API Documentation
const openApiPath = "apiDocs.yaml";
const readApiFile = fs.readFileSync(openApiPath, "utf8");
const swaggerDocs = yaml.parse(readApiFile); 

// App Router
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs)); 

app.use(
  OpenApiValidator.middleware({
    apiSpec: openApiPath,
    validateRequests: true,
  })
);

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})