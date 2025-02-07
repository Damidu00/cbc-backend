import express from 'express';
import { createProductFeedback, deleteProductFeedback, getAllProductFeedbacks, getProductFeedbackById } from '../controllers/productFeedbackController.js';

const productFeedbackRouter = express.Router()

productFeedbackRouter.post("/:productId",createProductFeedback)
productFeedbackRouter.get("/",getAllProductFeedbacks)
productFeedbackRouter.get("/:productId",getProductFeedbackById)
productFeedbackRouter.delete("/:productId",deleteProductFeedback)

export default productFeedbackRouter