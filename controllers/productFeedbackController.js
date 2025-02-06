import productFeedback from "../models/productFeedback";

export async function createProductFeedback(req,res){

    try {
        const { message } = req.body;
        const productId = req.params.productId
        const authUserEmail = req.user.email

        if(!productId){
            return res.status(404).json({
                message : "must have productId"
            })
        }

        let userId = null;
        try {
            const userResult = await User.findOne({enail : authUserEmail})
            userId = userResult._id.toString();
        } catch (error) {
            res.json({
                message : "invalid user"
            })
        }

    } catch (error) {
        
    }
}