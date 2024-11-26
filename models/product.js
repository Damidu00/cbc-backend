import mongoose from "mongoose";

const productsSchema = mongoose.Schema({
    name:String,
    price:Number,
    quentity:Number
})
const Product = mongoose.model("products",productsSchema)
export default Product