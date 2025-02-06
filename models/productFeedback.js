import mongoose from "mongoose";

const productFeedbackSchema = mongoose.Schema({
    productId : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    },
    status : {
        type : String,
        enum : ['pending', 'active'],
        default : 'pending'
    },
    time : {
        type : Date(),
        default : Date.now
    }

})

const productFeedback = mongoose.model("productFeedbacks",productFeedbackSchema)
export default productFeedback;