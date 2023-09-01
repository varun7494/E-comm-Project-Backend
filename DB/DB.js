const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/DB-Aug')


const db = mongoose.connection;


db.on('error', function () {
    console.log("Error in Connection with Mongo-DB")
})

db.once('open', function () {
    console.log("Successfully Connected with Mongo-DB")
})

module.exports = db