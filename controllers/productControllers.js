import Product from '../models/product.js';

export function createProduct(req,res){

    console.log(req.user)

    if(req.user == null){
        res.json({
            message:"you sre not loged in"
        })
        return
    }

    if(req.user.type != "admin"){
        res.json({
            message:"you are not a admin"
        })
        return
    }

    const product = new Product(req.body)
    
    product.save().then(()=>{
        res.json({
            message:"product Created"
        })
    }).catch(()=>{
        res.json({
            message:"product not created"
        })
    })
}

export function getproducts(req,res){
    Product.find().then((productList)=>{
        res.json({
            list:productList
        })
    }).catch((err)=>{
        res.json({
            message:"Error"
        })
    })
}

export function deleteProduct(req,res){

    Product.deleteOne({name: req.params.name}).then(()=>{
        res.json({
            message:"Product delete successfully"
        })
    }).catch(()=>{
        res.json({
            message:"product not deleted"
        })
    })
}

export function getProductByName(req,res){
    const name = req.params.name;
    
    Product.find({name:name}).then((productList)=>{
        res.json({
            list:productList
        })
    }).catch(()=>{
        res.json({
            message:"error"
        })
    })

}