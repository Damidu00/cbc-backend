import express from 'express';
import { createProductFeedback, getAllProductFeedbacks, getProductFeedbackById } from '../controllers/productFeedbackController.js';

const productFeedbackRouter = express.Router()

productFeedbackRouter.post("/:productId",createProductFeedback)
productFeedbackRouter.get("/",getAllProductFeedbacks)
productFeedbackRouter.get("/:productId",getProductFeedbackById)

export default productFeedbackRouter