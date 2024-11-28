import Product from '../models/product.js';

export async function createProduct(req, res) {
    try {
        console.log(req.user);

        if (!req.user) {
            res.json({
                message: "You are not logged in"
            });
            return;
        }

        if (req.user.type !== "admin") {
            res.json({
                message: "You are not an admin"
            });
            return;
        }

        const product = new Product(req.body);
        await product.save();
        res.json({
            message: "Product created successfully"
        });
    } catch (error) {
        res.json({
            message: "Product not created",
            error: error.message 
        });
    }
}


export async function getproducts(req,res){
    try {
        const productList = await Product.find()
        res.json({
            list:productList
        })
    } catch (error) {
        res.json({
            message: "cannot get Products",
            error:error.message
        })
    }

}

export async function deleteProduct(req,res){
    try {
        const result =await Product.deleteOne({name: req.params.name})
        if (result.deletedCount === 0) {
            res.json({
                message: "No product found with the given name"
            });
        } else {
            res.json({
                message: "Product deleted successfully"
            });
        }
    } catch (error) {
        res.json({
            message:"Cannot delete product",
            error:error.message
        })
    }
}

export async function getProductByName(req,res){
    const name = req.params.name;
    const productList = await Product.find({name:name})
    try {
        res.json({
            list:productList
        })
    } catch (error) {
        res.json({
            message: "Error",
            error:error.message
        })
    }

}