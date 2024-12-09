import Order from "../models/order.js";
import { isCustomer } from "./userController.js";

export async function createOrder(req,res){

    if(!isCustomer){
        res.json({
            message : "login as customer to plase order"
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
            const newNumber = (number + 1).toString().padStart(4, "0");
            orderId = "CBC" + newNumber
        }

        const newOrderData = req.body
        newOrderData.orderId = orderId

        const order = new Order(newOrderData)

        await order.save()

        res.json({
            message : "Order Plasede"
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

        req.json(orders)

    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}