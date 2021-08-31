const express = require("express");
const multer = require("multer");
const path = require("path")
require("./db/mongodb"); // to connect to db
const Product = require("./models/product")


const app = express()
//console.log(path.join(__dirname,"./public"))
const port = 8080;
const publicDirectory = path.join(__dirname, "./public")
app.use(express.static(publicDirectory))
app.use(express.json()) // to accept json
app.set("view engine", "hbs")
app.set("views", publicDirectory)



app.get("/", (req, res) => {
    res.render("index", {

    })
})

const upload = multer({
    //dest: "avatars", // we dont need anymore becasue we save avatar in server
    limits: {
        fileSize: 2000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.endsWith(".jpg") || file.originalname.endsWith(".jpeg") || file.originalname.endsWith(".png")) {
            cb(new Error("The extension of file must be .jpg or .jpeg or .png"))
        }
        cb(undefined, true)
    }
})

app.post("/product", async (req, res) => {
    try {
        const product = await Product.preventDublicate(req.body);
        res.status(201).send({ product })
    } catch (error) {
        res.status(400).send({ error: "This name has been used already" })
    }
})

app.post("/product/avatar/:id", upload.single("image"), async (req, res) => {
    const _id = req.params.id
    const product = await Product.findById(_id)
    if (!product) {
        throw new Error("there is no product to choose avatar")
    }
    product.image = req.file.buffer
    await product.save()
    res.send(req.file);

}, (req, res, next) => {
    res.status(404).send({ error: err.message })
})

app.get("/products", async (req, res) => {
    try {
        const products = await Product.find({})
        if (!products) {
            return res.status(404).send("There is no product to show")
        }
        res.status(200).send(products)
    } catch (error) {
        res.status(404).send("Unable to fetch products")
    }
})

app.get("/product/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)       
        if (!product) {            
            return res.status(404).send({ error: "There is no product that has that id" })
        }
        res.status(200).send(product)
    } catch (error) {       
        res.status(404).send({error : "There is no product that has that id"})
    }
})


app.get("/products/:id/image", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product || !product.image) {
            throw new Error("There is no product or product image");
        }
        res.set("Content-Type", "image/jpg") // to set content type as image
        res.send(product.image)
    } catch (error) {

    }
})

app.listen(port, () => {
    console.log("Server is available on port " + port)
})