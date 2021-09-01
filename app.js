const express = require("express");
const multer = require("multer");
const path = require("path")
require("./db/mongodb"); // to connect to db
const Product = require("./models/product")
var bodyParser = require('body-parser');
const mongoose = require("mongoose")

const app = express()
//console.log(path.join(__dirname,"./public"))
const port = 8080;
const publicDirectory = path.join(__dirname, "./public")

app.use(express.json()) // to accept json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.static(publicDirectory))
app.set("view engine", "hbs")
app.set("views", publicDirectory)


const sleep = function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

app.get("/", (req, res) => {
    res.render("index", {

    })
})

const upload = multer({
    limits: {
        fileSize: 2000000
    },
    fileFilter(req, file, cb) {
        if (!(file.originalname.endsWith(".jpg") || file.originalname.endsWith(".jpeg") || file.originalname.endsWith(".png"))) {
            cb(new Error("The extension of file must be .jpg or .jpeg or .png"))
        }
        cb(undefined, true)
    }
})

let productGlbl;

app.post("/product", async (req, res, next) => {
    try {
        console.log(req.body)
        productGlbl = await Product.preventDublicate(req.body)

//        await sleep(1200)
        //res.sendFile(path.join(__dirname,"/public/uploadAvatar.html"))
        next()
    } catch (error) {
        res.status(400).send({ error: "This name has been used already" })
    }
}, function (req, res) {
    const _id = mongoose.Types.ObjectId(productGlbl._id)
    console.log(_id)
    res.render("uploadAvatar", {
        id: _id
    })
})




app.post("/product/avatar/:id", upload.single("image"), async (req, res) => {
    try {
        const _id = req.params.id
        const product = await Product.findById(_id)
        console.log("product type --> " + typeof product)
        if (!product) {
            //("there is no product to choose avatar")
            return res.status(404).send("there is no product to choose avatar")
        }
        product.image = req.file.buffer
        await product.save()
        //res.send(req.file);
       res.redirect(`/product/${_id}`)
    } catch (error) {
        res.status(404).send({error : "your product id is unvalid or an error occured during the fetch product id"})
    }


}
// , (req, res, next) => {
//     res.render("route",{
        
//     })
//     //res.status(404).send({ error: error.message })
// }
)

app.post("/uploadProductAvatar", upload.single("image"), async (req, res, next) => {
    const file = req.file
    if (!file) {
        const error = new Error("please upload an avatar image for the product")
        error.httpStatusCode = 400
        return next(error)
    }
    res.status(200).send(file)
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
        res.status(404).send({ error: "There is no product that has that id" })
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