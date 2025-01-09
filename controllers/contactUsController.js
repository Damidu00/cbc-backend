import ContactUs from "../models/contactUs.js";

export async function CreateMessage(req,res){
    const messageData = req.body

    if (!messageData.name || !messageData.email || !messageData.phoneNumber || !messageData.comment) {
        return res.status(400).json({
            message: "You must fill all fields 😏"
        });
    }

    const message = new ContactUs(messageData)

    try {
        await message.save();
        return res.status(201).json({
            message : "Comment Submitted successfully 😮‍💨"
        })
    } catch (error) {
        res.status(500).json({
            message : "Error! cannot complete your request🫡",
            error:error.message
        })
    }


}