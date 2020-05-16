//Express configuration

var express = require("express");
const apiRoutes = require("./routes/routesAPI")
const htmlRoute = require("./routes/routesHtml")

//communicate with node and port 
var app = express();
var PORT = process.env.PORT || 8080;

//express app to data parsing

app.use(express.urlencoded ({extended: true}));
app.use(express.json());
app.use(express.static("public"))
app.use("/", htmlRoute)
app.use("/api", apiRoutes)
//ROUTER


//LISTENER

app.listen(PORT, function(){
    console.log("We are listening on the PORT: " + PORT);
});