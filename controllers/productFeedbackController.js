import ProductFeedback from '../models/productFeedback.js'
import User from '../models/user.js';

export async function createProductFeedback(req,res){

    try {
        const { message,rating  } = req.body;
        const productId = req.params.productId

        if(!productId){
            return res.status(404).json({
                message : "must have productId"
            })
        }
        const authUserEmail = req.user.email
        let userId = null;
        let userName = null;

        try {
            const userResult = await User.findOne({email : authUserEmail})
            userId = userResult._id.toString();
            userName = userResult.firstName + " " + userResult.lastName

        } catch (error) {
            res.json({
                message : "invalid user"
            })
        }

        const latestFeedback = await ProductFeedback.findOne().sort({time : -1})
        let newFeedbackId = "PF0001";

        if(latestFeedback){
            let lastIdNum = parseInt(latestFeedback.productFeedbackId.substring(2)); 
            let nextIdNum = lastIdNum + 1;
            newFeedbackId = `PF${nextIdNum.toString().padStart(4, "0")}`; 
        }


        const newproductFeedback = new ProductFeedback({
            userId : userId,
            productFeedbackId : newFeedbackId,
            productId : productId,
            userName : userName,
            message,
            rating
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


export async function getAllProductFeedbacks(req,res){
    try {
        const productFeedbacks = await ProductFeedback.find()
        res.status(200).json(productFeedbacks)
    } catch (error) {
        res.status(500).json({
            error : error.message
        })
    }
}

export async function getProductFeedbackById(req,res){
    const productId = req.params.productId
    
    try {
        const productFeedback = await ProductFeedback.findOne({productId : productId})
        res.status(200).json(productFeedback)
    } catch (error) {
        res.status(500).json({
            message : "Error with productFeedback",
            error : error.message
        })
    }
}