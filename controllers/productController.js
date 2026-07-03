import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export async function createProduct(req,res){

    if(!isAdmin(req)){
        res.status(403).json({
            message:"Access denied.Admins only "
        })
        return
    }

    try{
        const productID = req.body.productID || req.body.ProductID

        const existingProduct = await Product.findOne({
            productID : productID
        })

        if(existingProduct!=null){
            res.status(400).json({
                message: "Product with this product ID already exisist"
            })
            return
        }

        const newProduct = new Product({
            productID: productID,
            name: req.body.name,
            altName: req.body.altName,
            price: req.body.price,
            labelledPrice: req.body.labelledPrice,
            description:req.body.description,
            images:req.body.images,
            brand: req.body.brand,
            model:req.body.model,
            category:req.body.category,
            isAvailable: req.body.isAvailable,
            stock: req.body.stock
        });

        await newProduct.save()
        res.status(201).json({
            message:"Product created sucessfully"
        })

    }catch(error){
        res.status(500).json({
            message: "Error creating product"
        })
    }
}

export async function getAllProducts(req,res){
    try{
        if (isAdmin(req)){
            const products = await Product.find();
            res.json(products);
        }else{
            const products= await Product.find({isAvailable:true});
            res.json(products);
        }
    }catch (error){
            res.status(500).json({
                message:"Error fetching products"
            });
    }    
    
}

export async function deleteProduct(req,res){
    if (!isAdmin(req)){
        res.status(403).json({
            message:"Access denied. Admins only"
        })
        return
    }
    try{
        const result = await Product.deleteOne({
            productID:req.params.productId
        })
        if(result.deletedCount === 0){
            res.status(404).json({
                message:"Product not found"
            })
            return
        }
        res.status(200).json({
            message:"Product deleted successfully"
        })

    }catch(error){
        res.status(500).json({
            message:"Error deleting product"
        })
    }
}    

export async function updateProduct(req,res){
    if(!isAdmin(req)){
        res.status(403).json({
            message:"Access denied.Admin only",
        });
        return
    }
    try{
        const result = await Product.updateOne(
            {productID:req.params.productId},
            {
                name:req.body.name,
                altName:req.body.altName,
                price:req.body.price,
                labelledPrice:req.body.labelledPrice,
                description:req.body.description,
                images:req.body.images, 
                brand:req.body.brand,
                model:req.body.model,
                category:req.body.category,
                isAvailable:req.body.isAvailable,
                stock:req.body.stock
            }
        )
        if(result.matchedCount === 0){
            res.status(404).json({
                message:"Product not found"
            });
            return
        }
        res.status(200).json({
                message:"Product updated successfully" 
            });

    }catch(error){
        res.status(500).json({
            message:"Error updating product"
        });
    }
}

export async function getProductById(req,res) {
    try{
        const product = await Product.findOne({
            productID:req.params.productId
        })
        if(product==null){
            res.status(404).json({
                message:"Product not found"
            })
            return
        }

        if(product.isAvailable || isAdmin(req)){
            res.status(200).json(product)
            return
        }

        res.status(403).json({
            message:"Access denied. Admins only"
        })
    }catch(error){
        res.status(500).json({
            message:"Error fetching product"
        })
    }
}
