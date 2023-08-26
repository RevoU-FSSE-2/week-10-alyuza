require('dotenv').config();
const express = require('express');
const databaseMiddleware = require('./middleware/database-middleware.js');
const authRouter = require('./routes/auth-router.js');
const transferRouter = require('./routes/transfer-router.js');
const authMiddleware = require('./middleware/authentication-middleware.js');
const swaggerUi = require("swagger-ui-express");
const yaml = require("yaml");
const fs = require("fs");
const cors = require("cors")
const OpenApiValidator = require("express-openapi-validator");

const openApiPath = "apiDocsAi.yaml";
const readApiFile = fs.readFileSync(openApiPath, "utf8");
const swaggerDocs = yaml.parse(readApiFile); 

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs)); 
app.use(OpenApiValidator.middleware({
  apiSpec: openApiPath,
  validateRequests: true,
}))
app.use(databaseMiddleware);

app.get('/', (req, res) => {
  res.send('Week 10 Assignment - Alyuza Satrio Prayogo')
})

app.use('/auth', authRouter)
app.use('/transfers', authMiddleware, transferRouter)


app.listen(3000, () => {
  console.log('Server is running on Localhost:3000')
})

