import express from "express"
import { createProduct, deleteProduct, getProductById, getProducts } from "../controllers/productController.js";

const productRouter = express.Router()

productRouter.post("/",createProduct)
productRouter.get("/",getProducts)
productRouter.delete("/:id",deleteProduct)
productRouter.get("/:id",getProductById)

export default productRouter