const { MongoClient } = require('mongodb')

const databaseMiddleware = async (req, res, next) => {
    const mongoClient = await new MongoClient(process.env.MONGO_SIGN).connect()
    db = mongoClient.db('Revou')

    req.db = db

    next()
}
module.exports = databaseMiddleware
