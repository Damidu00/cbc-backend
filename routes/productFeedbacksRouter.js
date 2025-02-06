import express from 'express';
import { createProductFeedback } from '../controllers/productFeedbackController';

const productFeedbackRouter = express.Router()

productFeedbackRouter.post("/",createProductFeedback)

export default productFeedbackRouter