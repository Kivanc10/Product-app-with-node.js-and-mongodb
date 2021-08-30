const express = require("express");
const path = require("path")
require("./db/mongodb"); // to connect to db

const app = express()
//console.log(path.join(__dirname,"./public"))
const port = 8080;
const publicDirectory = path.join(__dirname,"./public")
app.use(express.static(publicDirectory))
app.set("view engine","hbs")
app.set("views",publicDirectory)



app.get("/",(req,res) => {
    res.render("index",{

    })
})


app.listen(port,() => {
    console.log("Server is available on port " + port)
})