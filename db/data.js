// dependences 

var express = require("express");
var path = require("path");
var notesArray = require("./store")

//set up express

var app = express();
var PORT = 3000;
//data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//route to AJAX page
app.get("/", function (req,res){
    res.sendFile(path.join(__dirname, "public/notes"))
})