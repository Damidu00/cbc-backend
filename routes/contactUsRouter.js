import express from 'express'
import { CreateMessage } from '../controllers/contactUsController.js';

const contactUsRouter = express.Router();

contactUsRouter.post("/",CreateMessage)

export default contactUsRouter