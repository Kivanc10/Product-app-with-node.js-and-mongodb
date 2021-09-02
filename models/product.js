/*
id | name | image |price
1 | Brass or Silver Leaf Bookmark Set | https://i.etsystatic.com/12149676/r/il/b96248/2959017777/il_794xN.2959017777_t44r.jpg | 9.5
*/
const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    image : {
        type : Buffer,
        default : null    
    },
    price : {
        type : Number,
        required : true
    }
},{
    timestamps : true
})

productSchema.statics.preventDublicate = async function(obj) {
    const query = await Product.findOne({name : obj.name})

    if (!query) {
        if (typeof obj.price === "string"){
            obj.price = Number.parseFloat(obj.price)
        }
        // console.log("preventDub")
        // console.log(obj)
        const product = new Product(obj)
        await product.save()
        return product;
    }else{
        throw new Error();
    }

}


productSchema.methods.toJSON = function() {
    const product = this
    const productObj = product.toObject()
    delete productObj.image
    if (product.image === null) {
        productObj["image_link"] = "-"
    }else{
        const imageUrl = "http://localhost:8080/products/" + product._id + "/image"
        productObj["image_link"] = imageUrl
        // String.prototype.link(imageUrl)
    }
    return productObj
}

const Product = mongoose.model("Product",productSchema)

module.exports = Product;