const express = require('express');
require('dotenv').config();
const swaggerUi = require("swagger-ui-express");
const yaml = require("yaml");
const fs = require("fs");
const cors = require("cors")
const OpenApiValidator = require("express-openapi-validator");

const openApiPath = "apiDocsAi.yaml";
const readApiFile = fs.readFileSync(openApiPath, "utf8");
const swaggerDocs = yaml.parse(readApiFile);
const app = express();

const authMiddleware = require('./middleware/authentication-middleware.js');
const databaseMiddleware = require('./middleware/database-middleware.js');
const authRouter = require('./routes/auth-router.js');
const transferRouter = require('./routes/transfer-router.js');

app.use(cors());
app.use(express.json());
app.use(databaseMiddleware);

// homepage
app.get('/', (req, res) => {
  res.send('Week 10 Assignment - Alyuza Satrio Prayogo')
})

// Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// API Validator
app.use(OpenApiValidator.middleware({
  apiSpec: openApiPath,
  validateRequests: true,
}))

app.use('/auth', authRouter)
app.use('/transfers', authMiddleware, transferRouter)

// connect to localhost
app.listen(3000, () => {
  console.log('Server is running on Localhost:3000')
})

