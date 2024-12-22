import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export async function createProduct(req,res){

    if(!isAdmin(req)){
        res.json({
            message : "Login as admin to create a product"
        })
        return
    }

    const newProductData = req.body
    const product = new Product(newProductData)

    try {
        await product.save();
        res.json({
            message : "product Created successfully"
        })
    } catch (error) {
        res.json({
            message : "product not created",
            error : error.message
        })
        
    }
}

export async function getProducts(req,res){
   try {
    const products = await Product.find();
    res.json(products)
   } catch (error) {
    res.json({
        message : "cannot get products",
        error : error.message
    })
   } 
}

export async function deleteProduct(req,res){
    if(!isAdmin(req)){
        return res.json({
            message : "only admins can delete products"
        })
    }
    const productId = req.params.productId;

    try {
        const deletedProduct = await Product.findOneAndDelete(productId)

        if(!deletedProduct){
            return res.json({
                message : "Product not found"
            })
        }

        res.json({
            message : "Product deleted successfully"
        })
    } catch (error) {
        res.json({
            error : error.message
        })
    }
}
