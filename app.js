require('dotenv').config();
// Import
const OpenApiValidator = require("express-openapi-validator");
const swaggerUi = require("swagger-ui-express");
const yaml = require("yaml");
const fs = require("fs");
const cors = require("cors")

const express = require('express');
const databaseMiddleware = require('./middleware/database-middleware.js');
const authMiddleware = require('./middleware/authentication-middleware.js');
const authRouter = require('./routes/auth-router.js');
const transferRouter = require('./routes/transfer-router.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use(databaseMiddleware);

app.get('/', (req, res) => {
  res.send('Week 10 Assignment - Alyuza Satrio Prayogo')
})

app.use('/auth', authRouter)
app.use('/transfers', authMiddleware, transferRouter)

// API Documentation
const openApiPath = "apiDocsAi.yaml";
const readApiFile = fs.readFileSync(openApiPath, "utf8");
const swaggerDocs = yaml.parse(readApiFile); 

// App Router
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs)); 



const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})