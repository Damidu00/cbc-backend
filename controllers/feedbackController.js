import Feedback from "../models/feedback.js";

export async function createFeedback(req,res){
    try {
        const {feedbackId , userName , message} = req.body;

        const newFeedback = new Feedback({
            feedbackId,
            userName,
            message
        });

        await newFeedback.save()

        res.status(201).json({
            message : "Feedback created succsessfully",
            feedback : newFeedback
        })

    } catch (error) {
        res.status(500).json({
            error : error.message,
            message : "Cannot send feedback"
        })
    }
}