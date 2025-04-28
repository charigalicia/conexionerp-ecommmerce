import {v2 as cloudinary} from "cloudinary"
import productModel from "../models/productModel.js"
import { syncProductToERP, deleteProductFromERP } from "../services/erpProductService.js";

// funcion para añadir producto
const addProduct = async (req,res)=>{
    try {

        const {name,description,price,category,subCategory,sizes,bestseller}=req.body

        const image1=req.files.image1 && req.files.image1[0]

        const images=[image1].filter((item)=>item !==undefined)

        let imagesUrl=await Promise.all(
            images.map(async(item)=>{
                let result =await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url

            })
        )

        const productData ={
            name,
            description,
            category,
            price:Number(price),
            subCategory,
            bestseller: bestseller ==="true" ? true :false,
            sizes:JSON.parse(sizes),
            image:imagesUrl,
            date: Date.now()
        }

        console.log(productData);
         const product=new productModel (productData);
         await product.save()
        


        // Sincronizar con ERPNext
        try {
            await syncProductToERP(product);
            console.log("Producto sincronizado con ERPNext correctamente");
        } catch (erpError) {
            console.error("Error al sincronizar con ERPNext:", erpError.message);
            // No fallamos la operación principal si falla la sincronización
        }

        res.json({success:true,message:"producto añadido"})
    } catch (error) {
        console.log(error)
        res.json ({succes:false, message:error.message})
    }
}

// funcion para  mostrar producto
const listProducts = async (req,res)=>{
    try {
        const products = await productModel.find({});
        res.json({success:true,products})
    } catch (error) {
        console.log(error)
        res.json ({succes:false, message:error.message})
        
    }
    
}

// funcion para eliminar producto
const removeProduct = async (req,res)=>{
    try {
        const productId = req.body.id;
        
        // Primero, deshabilitar en ERPNext
        try {
            await deleteProductFromERP(productId);
            console.log("Producto deshabilitado en ERPNext correctamente");
        } catch (erpError) {
            console.error("Error al deshabilitar producto en ERPNext:", erpError.message);
            // Continuamos con la eliminación local aunque falle en ERPNext
        }
        
        // Luego eliminamos de MongoDB
        await productModel.findByIdAndDelete(productId);
        
        res.json({success:true,message:"Producto eliminado"});
    } catch (error){
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

// funcion para info de un producto
const singleProduct = async (req,res)=>{
    try {

        const {productId}=req.body
        const product=await productModel.findById(productId)
        res.json({success:true, product})
        
    } catch (error) {
        console.log(error)
        res.json ({succes:false, message:error.message})
        
    }
    
}



export {addProduct, listProducts, removeProduct, singleProduct}