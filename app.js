require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const route = require("./Routes/api");
const mongoose = require("mongoose");

// set up app
const app = express();

mongoose.connect('mongodb://localhost:27017/userDB', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});


// set view engine
app.set('view engine', 'ejs');

// set up middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(route);


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function(){
    console.log("Server started on Port 3000");
})
