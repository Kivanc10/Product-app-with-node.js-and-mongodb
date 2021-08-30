const express = require("express");
const path = require("path")
require("./db/mongodb"); // to connect to db
const Product = require("./models/product")


const app = express()
//console.log(path.join(__dirname,"./public"))
const port = 8080;
const publicDirectory = path.join(__dirname,"./public")
app.use(express.static(publicDirectory))
app.use(express.json()) // to accept json
app.set("view engine","hbs")
app.set("views",publicDirectory)



app.get("/",(req,res) => {
    res.render("index",{

    })
})

app.post("/product",async (req,res) => {
    try {
        const product = await Product.preventDublicate(req.body);
        res.status(201).send({product})
    } catch (error) {
        res.status(400).send({error : "This name has been used already"})
    }
})

app.get("/products",async (req,res) => {
    try {
        const products = await Product.find({})
        if (!products) {
            return res.status(404).send("There is no user to show")
        }
        res.status(200).send(products)
    } catch (error) {
        res.status(404).send("Unable to fetch products")
    }
})


app.listen(port,() => {
    console.log("Server is available on port " + port)
})