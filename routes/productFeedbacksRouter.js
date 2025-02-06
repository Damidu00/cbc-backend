import express from 'express';
import { createProductFeedback } from '../controllers/productFeedbackController.js';

const productFeedbackRouter = express.Router()

productFeedbackRouter.post("/",createProductFeedback)

export default productFeedbackRouter