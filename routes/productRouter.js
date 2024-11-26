import express from 'express'
import { createProduct, deleteProduct, getProductByName, getproducts } from '../controllers/productControllers.js';

const productRouter = express.Router();

productRouter.get("/",getproducts);
productRouter.get("/:name",getProductByName);
productRouter.post("/",createProduct);
productRouter.delete("/:name",deleteProduct);


export default productRouter