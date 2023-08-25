const express = require('express');
const {MongoClient, ObjectId} = require('mongodb');
const userRouter = require ('./routes/userRouter.js')
const transferRouter = require ('./routes/transferRouter.js')

const app = express();
app.use(express.json())

app.use( async (req, res, next) => {
    let db
    try {
      const client = await new MongoClient('mongodb://127.0.0.1:27017').connect()
      db = client.db('Revou')
    } catch (error) {
      console.log(error, `<=================== error ==================`);
      return res.status(400).json({ error: "Failed connect to database" });
    }
    
    req.db = db
    next()
  })


app.get('/', (req,res)=>{
    res.send ('Assignment Week 10 - Alyuza Satrio Prayogo')
})

app.use('/v1/users', userRouter)
app.use('/v1/transactions', transferRouter)

const port = 3000 || 4000;

app.listen(port, () => {
    console.log(`Running on port http://localhost:${port}`)
  })