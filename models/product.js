/*
id | name | image |price
1 | Brass or Silver Leaf Bookmark Set | https://i.etsystatic.com/12149676/r/il/b96248/2959017777/il_794xN.2959017777_t44r.jpg | 9.5
*/
const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    image : {
        type : Buffer        
    },
    price : {
        type : Number,
        required : true
    }
},{
    timestamps : true
})

const Product = mongoose.model("Product",productSchema)

module.exports = Product;