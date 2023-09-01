const express = require('express');
const app = express();
const PORT  = 9431
const bodyParser = require('body-parser')
const MyRoutes  = require('./Routes/Routes')
const db = require('./DB/DB')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended :  true}))

app.use('/' ,  MyRoutes)







app.listen(PORT , ()=>{
    console.log(`Server is Running on PORT : ${PORT}`)
})