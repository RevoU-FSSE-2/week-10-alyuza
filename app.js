require('dotenv').config();
const { MongoClient } = require('mongodb');
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
const PORT = process.env.PORT || 8080
const uri = `mongodb+srv://revou:yuzaimoet123@billieeilish.8qyc76s.mongodb.net/?retryWrites=true&w=majority`

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



app.listen(PORT, () => {
  console.log(`⚡️Server is running at localhost:${PORT}`);
});