import express from "express"
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/productController.js";

const productRouter = express.Router()

productRouter.post("/",createProduct)
productRouter.get("/",getProducts)
productRouter.delete("/:productId",deleteProduct)
productRouter.get("/:id",getProductById)
productRouter.put("/:productId",updateProduct)

export default productRouter