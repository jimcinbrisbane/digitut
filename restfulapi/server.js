require('dotenv').config()

const express = require('express')
const app = express()

const MongoClient = require('mongodb').MongoClient;
const test = require('assert');
// Connection url
// Database Name

const url = 'MONGODBURL';
// Database Name
const database = "digiClub";
const collection = "units";
// Connect using MongoClient
const helmet = require("helmet");
app.use(express.json())
app.use(helmet());
app.get('/unit/:name',(req, res) => {
    MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, client) {
        const db = client.db(database)
        const col = db.collection(collection)
        var data = col.findOne({name: req.params.name}, function(err, result) {
          if (result === null) {
            res.send({error: "Input Error"})
          } else {
            res.send(result)
          }
          client.close();
          return result
           })
        })
      
  })
app.use(express.static('public'))
const port = process.env.PORT || 8080
app.listen(port,() => console.log("server started at localhost:8080"))

