import mongoose from "mongoose";

const FeedbackShema = mongoose.Schema({
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
    adminReply : [
        {
            adminId : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'users'
            },
            message : {
                type : String
            },
            time : {
                type : Date,
                default : Date.now
            }
        }
    ]

})

const Feedback = mongoose.model("feedbacks",FeedbackShema)
export default Feedback;