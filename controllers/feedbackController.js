import Feedback from "../models/feedback.js";
import User from "../models/user.js";
import { isAdmin } from "./userController.js";

export async function createFeedback(req, res) {
    try {
        const { message } = req.body;
        const authUserEmail = req.user.email;

        //validate
        var userId = null;
        try{
            const userResult = await User.findOne({email:authUserEmail});
            userId = userResult._id.toString();
        }catch(error){
            return res.send("Invalid user id");
        }

        const latestFeedback = await Feedback.findOne().sort({ time: -1 });

        let newFeedbackId = "F0001"; 

        if (latestFeedback) {
  
            let lastIdNum = parseInt(latestFeedback.feedbackId.substring(1)); 
            let nextIdNum = lastIdNum + 1;
            newFeedbackId = `F${nextIdNum.toString().padStart(4, "0")}`; 
            
        }
        


        const newFeedback = new Feedback({
            userId: userId,
            feedbackId: newFeedbackId,
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
        var feedbacks = await Feedback.find();

        var response =[];
        for(var i = 0; i < feedbacks.length; i++){

            var feedBack = feedbacks[i].toObject();
            const feedUid = feedBack.userId;

            const userDetails = await User.findById(feedUid);
            const name = userDetails.firstName+" "+userDetails.lastName;
            feedBack.user_name = name;           
            response.push(feedBack);
        }

        res.status(200).json({feedbacks: response})
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


        feedback.adminReply.push({
            message,
            time: new Date() 
        });

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


export async function deleteFeedback(req,res){

    try {

        const feedbackId = req.params.feedbackId;

        if(!feedbackId){
            return res.status(404).json({
                message : "Feedback id is required"
            })
        }

        const response = await Feedback.deleteOne({feedbackId : feedbackId})

        if(response.deletedCount === 0){
            return res.status(404).json({
                message: "Feedback not found"
            });
        }

        res.status(200).json({
            message : "Feedback Deleted Succsessfully"
        })

    } catch (error) {
        res.status(500).json({
            message : "Error when deleting the feedback",
            error : error.message
        })
    }
}
