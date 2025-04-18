import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import Stripe from 'stripe'


//Crear Variables globales
const currency = 'mxn'
const deliveryCharge = 10

//Iniciar gateaway
const stripe =new Stripe(process.env.STRIPE_SECRET_KEY)


// Poniendo pedido usando metodo COD

const placeOrder = async (req,res)=>{
    try {
        const {userId, items, amount, address}=req.body;

        const orderData ={
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment: false,
            date:Date.now()
        }

        const newOrder= new orderModel (orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate (userId,{cart:{}})

        res.json({success:true, message:"Pedido realizado"})
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }

}

// Poniendo pedido usando método Stripe
const placeOrderStripe = async (req,res)=>{
    try {
        const {userId, items, amount, address}=req.body
        const{origin}=req.headers;

        const orderData ={
            userId,
            items,
            address,
            amount,
            paymentMethod:"STRIPE",
            payment: false,
            date:Date.now()
        }

        const newOrder= new orderModel (orderData)
        await newOrder.save()

        const line_items = items.map((item)=>({
            price_data:{
                currency:currency,
                product_data:{
                    name:item.name


                },
                unit_amount: item.price * 100
            },

            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:currency,
                product_data:{
                    name:'Cargos de envío'


                },
                unit_amount: deliveryCharge * 100
            },

            quantity:1
        })

        const session= await stripe.checkout.sessions.create({
            success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode:'payment', 
        })
        
        res.json ({success:true,session_url:session.url})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
    
}

//Verificar Stripe

const verifyStripe = async (req,res)=>{
    const {orderId, success, userId}=req.body

    try {
        if (success==="true"){
            await orderModel.findByIdAndUpdate (orderId, {payment:true});
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({success:true});
        }else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }
}

// Todos los datos de los pedidos en admin panel
const allOrders = async (req,res)=>{
    try{
        const orders=await orderModel.find({})
        res.json({success:true,orders})

    }catch (error){
        console.log(error)
        res.json({success:false, message:error.message})

    }
    
}

// Datos del pedido usuario Frontend
const userOrders = async (req,res)=>{
    try {
        const {userId }=req.body
        const orders =await orderModel.find({userId})
        res.json({success:true, orders })
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
    
}

// Actualizar estados de pedidos desde panel admin
const updateStatus = async (req,res)=>{
    try{

        const {orderId, status}= req.body
        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success:true, message:'Estado Actualizado'})
    }catch (error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
    
}

export {verifyStripe, placeOrder,placeOrderStripe,allOrders, userOrders, updateStatus}