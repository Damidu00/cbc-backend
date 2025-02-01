import Feedback from "../models/feedback.js";

export async function createFeedback(req, res) {
    try {
        const { userName, message } = req.body;


        const latestFeedback = await Feedback.findOne().sort({ feedbackId: -1 });

        let newFeedbackId = "F0001"; 

        if (latestFeedback) {
  
            let lastIdNum = parseInt(latestFeedback.feedbackId.substring(1)); 
            let nextIdNum = lastIdNum + 1;
            newFeedbackId = `F${nextIdNum.toString().padStart(4, "0")}`; 
        }


        const newFeedback = new Feedback({
            feedbackId: newFeedbackId,
            userName,
            message
        });

        await newFeedback.save();

        res.status(201).json({
            message: "Feedback created successfully",
            feedback: newFeedback
        });

    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Cannot send feedback"
        });
    }
}


export async function getAllFeedbacks(req,res){

    try {
        const feedbacks = await Feedback.find();

        res.status(200).json({
            feedbacks
        })
    } catch (error) {
        res.json({
            error: error.message,
            message : "Error to fetch feedbacks"
        })
    }
}

export async function adminReply(req, res) {
    try {
        const { feedbackId, adminId, message } = req.body;

        const feedback = await Feedback.findOne({ feedbackId });

        if (!feedback) {
            return res.status(404).json({
                message: "Feedback not found"
            });
        }


        feedback.adminReply = {
            message,
            time: new Date() 
        };

        feedback.status = 'replied'; 

        await feedback.save();

        res.status(200).json({
            message: "Admin reply added successfully! 😊"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error with replying",
            error: error.message
        });
    }
}
