import Feedback from "../models/feedback.js";

export async function createFeedback(req,res){
    try {
        const {userName , message} = req.body;

        const newFeedback = new Feedback({
            userName,
            message
        });

        await newFeedback.save()

        res.status(201).json({
            message : "Feedback created succsessfully",
            feedback : newFeedback
        })

    } catch (error) {
        res.json({
            error : error.message,
            message : "Cannot send feedback"
        })
    }
}