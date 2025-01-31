import express from 'express'
import { createFeedback } from '../controllers/feedbackController'


const feedbackRouter = express.Router()

feedbackRouter.post("/",createFeedback)