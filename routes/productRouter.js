import express from "express"
import { createProduct, deleteProduct, getProductById, getProducts, searchProducts, updateProduct } from "../controllers/productController.js";

const productRouter = express.Router()

productRouter.post("/",createProduct)
productRouter.get("/",getProducts)
productRouter.get("/search/:query",searchProducts)
productRouter.delete("/:productId",deleteProduct)
productRouter.get("/:productId",getProductById)
productRouter.put("/:productId",updateProduct)

export default productRouter