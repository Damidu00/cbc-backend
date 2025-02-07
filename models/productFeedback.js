import mongoose from "mongoose";

const productFeedbackSchema = mongoose.Schema({

    productFeedbackId : {
        type : String,
        required : true
    },
    productId : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true
    },
    userName: {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        min : 1,
        max : 5,
        required : true
    },
    status : {
        type : String,
        enum : ['pending', 'active'],
        default : 'pending'
    },
    time : {
        type : Date,
        default : Date.now
    }

})

const ProductFeedback = mongoose.model("productFeedbacks",productFeedbackSchema)
export default ProductFeedback