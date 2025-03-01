import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export async function createProduct(req,res){

    if(!isAdmin(req)){
        res.json({
            message : "Login as admin to create a product😏"
        })
        return
    }

    const newProductData = req.body
    const product = new Product(newProductData)

    try {
        await product.save();
        return res.json({
            message : "product Created successfully😮‍💨"
        })
    } catch (error) {
        return res.status(403).json({
            message : "product not created🧐",
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
        message : "cannot get products🧐",
        error : error.message
    })
   } 
}


export async function getProductById(req,res){

    const productId = req.params.productId;
    try {
        const product = await Product.findOne({productId : productId})

        // if(!product){
        //     return res.json({
        //         message : "product not found"
        //     })
        // }
        res.json(product)

    } catch (error) {
        res.status(500).json({
            error : error.message,
            message : "Error retrieving product🫡"
        })
    }

}

export async function deleteProduct(req, res) {
    try {
      if (!isAdmin(req)) {
        return res.status(403).json({
          message: "Please login as administrator to delete products😏"
        });
      }
  
      const productId = req.params.productId;
  
      await Product.deleteOne({ productId: productId });
  
      res.json({
        message: "Product deleted😮‍💨"
      });
    } catch (error) {
      res.status(403).json({
        message: error.message || error
      });
    }
  }
  

export async function updateProduct(req,res){
    if(!isAdmin(req)){
        return res.json({
            message : "only admin can update a product🫡"
        })
    }

    const productId = req.params.productId;
    const newProductData = req.body;

    try {
        const updatedProduct = await Product.updateOne(
            {productId : productId},
            newProductData
        )

        if(!updatedProduct){
            return res.json({
                message : "product not found in given id😕"
            })
        }

        res.json({
            message : "Product Updated successfully😮‍💨"
        })

    } catch (error) {
        res.json({
            error : error.message,
            message : "cannot update product😊"
        })
    }
}

export async function searchProducts(req, res) {
    const query = req.params.query;
    try {
      const products = await Product.find({
        $or: [
          { productName: { $regex: query, $options: "i" } },
          { altNames: { $elemMatch: { $regex: query, $options: "i" } } },
        ],
      });
  
      res.json(products);
    } catch (e) {
      res.status(500).json({
        e,
      });
    }
  }