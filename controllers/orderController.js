import Order from "../models/order.js";
import { isCustomer } from "./userController.js";
import Product from "../models/product.js";

export async function createOrder(req,res){

    if(!isCustomer){
        res.json({
            message : "login as customer to place order😏"
        })
    }


    try {
        const latestOrder = await Order.find().sort({date : -1}).limit(1)

        let orderId
        
        if(latestOrder.length == 0){
            orderId = "CBC00001"
        }else{
            const currentOrderId = latestOrder[0].orderId
            const numberString = currentOrderId.replace("CBC","")
            const number = parseInt (numberString)
            const newNumber = (number + 1).toString().padStart(4,"0");
            orderId = "CBC" + newNumber
        }

        const newOrderData = req.body

        const newProductArray = []

        for(let i=0;i<newOrderData.orderedItems.length;i++){
            console.log(req.body.orderedItems[i])


            const product = await Product.findOne({
                productId : newOrderData.orderedItems[i].productId

                
            })
            
            if(product == null){
                res.json({
                    message : "product with id "+newOrderData.orderedItems[i].productId+" Not found🧐"
                })
                return 
            }

            newProductArray[i] = {
                name : product.productName,
                price : product.price,
                quentity : newOrderData.orderedItems[i].quantity,
                image : product.images[0]
            }

        }
        console.log(newProductArray)


        newOrderData.orderedItems = newProductArray


        newOrderData.orderId = orderId
        newOrderData.email = req.user.email

        const order = new Order(newOrderData)

        await order.save()

        res.json({
            message : "Order Plasede😮‍💨"
        })

        
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}

export async function getOrders(req,res){
    try {
        const orders = await Order.find({email : req.user.email})
        res.json(orders)

    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}