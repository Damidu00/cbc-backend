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
        return res.json({
            message : "product Created successfully"
        })
    } catch (error) {
        return res.status(403).json({
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


export async function getProductById(req,res){

    const productId = req.params.id;
    try {
        const product = await Product.findById(productId)

        if(!product){
            return res.json({
                message : "product not found"
            })
        }
        res.json(product)

    } catch (error) {
        res.json({
            error : error.message,
            message : "Error retrieving product"
        })
    }

}

export async function deleteProduct(req,res){
    if(!isAdmin(req)){
        return res.json({
            message : "only admins can delete products"
        })
    }
    const productId = req.params.id;

    try {
        const deletedProduct = await Product.findByIdAndDelete(productId)

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

export async function updateProduct(req,res){
    if(!isAdmin(req)){
        return res.json({
            message : "only admin can update a product"
        })
    }

    const productId = req.params.id;
    const updatedData = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            updatedData,
            {new : true}
        )

        if(!updatedProduct){
            return res.json({
                message : "product not found in given id"
            })
        }

        res.json({
            message : "Product Updated successfully"
        })

    } catch (error) {
        res.json({
            error : error.message,
            message : "cannot update product"
        })
    }
}
