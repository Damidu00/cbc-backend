import express from "express"
import { createProduct, deleteProduct, getProducts } from "../controllers/productController.js";

const productRouter = express.Router()

productRouter.post("/",createProduct)
productRouter.get("/",getProducts)
productRouter.delete("/:id",deleteProduct)

export default productRouter