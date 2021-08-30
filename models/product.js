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
        const product = new Product(obj)
        await product.save()
        return product;
    }else{
        throw new Error();
    }

}

const Product = mongoose.model("Product",productSchema)

module.exports = Product;