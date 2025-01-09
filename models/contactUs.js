import mongoose from "mongoose";

const ContactUsSchema = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        requre : true
    },
    phoneNumber : {
        type : String,
        require : true
    },
    comment: {
        type : String,
        require : true
    }
})

const ContactUs = mongoose.model("message",ContactUsSchema)
export default ContactUs