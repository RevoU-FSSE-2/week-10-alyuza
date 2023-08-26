const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000

const uri = 'mongodb+srv://revou:yuzaimoet123@billieeilish.8qyc76s.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

app.get("/items/:my_item", async (req, res) => {
    let item = await client.db("Revou")
                .collection("users")
                .find().toArray()

    return res.json(item)
})

client.connect(err => {
    if(err){ console.error(err); return false;}
    // connection to mongo is successful, listen for requests
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
});