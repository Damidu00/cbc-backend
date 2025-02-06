import ProductFeedback from '../models/productFeedback.js'
import User from '../models/user.js';

export async function createProductFeedback(req,res){

    try {
        const { message } = req.body;
        console.log(message)
        const productId = req.params.productId
        console.log(productId)
        

        if(!productId){
            return res.status(404).json({
                message : "must have productId"
            })
        }
        const authUserEmail = req.user.email
        let userId = null;
        try {
            const userResult = await User.findOne({email : authUserEmail})
            userId = userResult._id.toString();
            const userName = userResult.firstName + " " + userResult.lastName
            console.log(userName)
        } catch (error) {
            res.json({
                message : "invalid user"
            })
        }


        const latestFeedback = await ProductFeedback.findOne().sort({time : -1})
        let newFeedbackId = "PF0001";

        if(latestFeedback){
            let lastIdNum = parseInt(latestFeedback.feedbackId.substring(1)); 
            let nextIdNum = lastIdNum + 1;
            newFeedbackId = `PF${nextIdNum.toString().padStart(4, "0")}`; 
        }
        console.log(newFeedbackId)

        const newproductFeedback = new ProductFeedback({
            userId : userId,
            productFeedbackId : newFeedbackId,
            productId : productId,
            message
        })

        await newproductFeedback.save()

        res.status(200).json({
            message : "Product Feedback Created"
        })

    } catch (error) {
        res.status(500).json({
            error : error.message,
            message : "cant create the product feedback"
        })
    }
}