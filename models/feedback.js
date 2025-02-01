import mongoose from "mongoose";

const FeedbackShema = mongoose.Schema({
    feedbackId : {
        type : String,
        // required : true,
        unique: true
    },
    userName : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    },
    time : {
        type : Date,
        default : Date.now
    },
    status: {
        type : String,
        enum : ['pending','replied'],
        default : 'pending'
    },
    adminReply : 
        {
            message : {
                type : String
            },
            time : {
                type : Date,
                default : Date.now
            }
        }

})

const Feedback = mongoose.model("feedbacks",FeedbackShema)
export default Feedback;