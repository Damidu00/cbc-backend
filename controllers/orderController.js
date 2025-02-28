import Order from "../models/order.js";
import { isAdmin, isCustomer } from "./userController.js";
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
                price : product.lastPrice,
                quentity : newOrderData.orderedItems[i].qty,
                image : product.images[0]
            }

        }
        console.log(newProductArray)


        newOrderData.orderedItems = newProductArray


        newOrderData.orderId = orderId
        newOrderData.email = req.user.email

        const order = new Order(newOrderData)

        const savedOrder = await order.save()

        res.json({
            message : "Order Plasede😮‍💨",
            order : savedOrder
        })

        
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}

export async function getOrders(req,res){
    try {
        if(isCustomer(req)){
            const orders = await Order.find({email : req.user.email})
            res.json(orders)
            return;
        }else if(isAdmin(req)){
            const orders = await Order.find([]);
            res.json(orders);
            return;
        }else{
            res.json({
                message: "please login to view orders"
            })
        }
       

    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}

export async function getQuote(req,res){
    
    try {
        
    

        const newOrderData = req.body

        const newProductArray = []
        let total = 0;
        let labeledTotal = 0;
        console.log(req.body)

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
            labeledTotal += product.price * newOrderData.orderedItems[i].qty;
            total += product.lastPrice * newOrderData.orderedItems[i].qty;

            newProductArray[i] = {
                name : product.productName,
                price : product.lastPrice,
                labeledPrice:product.price,
                quentity : newOrderData.orderedItems[i].qty,
                image : product.images[0]
            }

        }
        console.log(newProductArray)
        newOrderData.orderedItems = newProductArray;
        newOrderData.total = total;
        
        res.json({
            orderedItems : newProductArray,
            total : total,
            labeledTotal : labeledTotal
        })
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}


export async function updateOrder(req, res) {
    if (!isAdmin(req)) {
      res.json({
        message: "Please login as admin to update orders",
      });
    }
    
    try {
      const orderId = req.params.orderId;
  
      const order = await Order.findOne({
        orderId: orderId,
      });
  
      if (order == null) {
        res.status(404).json({
          message: "Order not found",
        })
        return;
      }
  
      const notes = req.body.notes;
      const status = req.body.status;
  
      const updateOrder = await Order.findOneAndUpdate(
        { orderId: orderId },
        { notes: notes, status: status }
      );
  
      res.json({
        message: "Order updated",
        updateOrder: updateOrder
      });
  
    }catch(error){
  
      
      res.status(500).json({
        message: error.message,
      });
    }
  }