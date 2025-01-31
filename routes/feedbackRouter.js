import express from 'express'
import { createFeedback, getAllFeedbacks } from '../controllers/feedbackController.js'


const feedbackRouter = express.Router()

feedbackRouter.post("/",createFeedback)
feedbackRouter.get("/",getAllFeedbacks)


export default feedbackRouter