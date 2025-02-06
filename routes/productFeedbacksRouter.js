import express from 'express';
import { createProductFeedback, getAllProductFeedbacks } from '../controllers/productFeedbackController.js';

const productFeedbackRouter = express.Router()

productFeedbackRouter.post("/:productId",createProductFeedback)
productFeedbackRouter.get("/",getAllProductFeedbacks)

export default productFeedbackRouter