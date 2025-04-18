import userModel from "../models/userModel.js"


// añadir productos al carro del usuario

const addToCart =async(req,res)=>{
    try {
        const {userId, itemId, size}=req.body
        const userData= await userModel.findById(userId)
        let cartData = await userData.cartData;

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] +=1            
            }else{
                cartData[itemId][size]=1
            }   
        }else{
            cartData[itemId]={}
            cartData[itemId][size]=1
        }

        await userModel.findByIdAndUpdate (userId,{cartData})
        res.json({success:true, message: "Añadido al Carrito"})

    } catch (error) {
        console.log(error);
        res.json ({succes:false, message:error.message})
    }

}

// actualizar productos al carro del usuario
const updateCart =async(req,res)=>{
    try {
        const {userId, itemId,size, quantity}= req.body
        const userData= await userModel.findById(userId)
        let cartData = await userData.cartData;

        cartData[itemId][size]=quantity

        await userModel.findByIdAndUpdate (userId,{cartData})
        res.json({success:true, message: "Carrito Actualizado"})

    } catch (error) {
        console.log(error);
        res.json ({succes:false, message:error.message})  
    }

}

// obtener datos productos al carro del usuario
const getUserCart =async(req,res)=>{
    try {
        const {userId}=req.body

        const userData= await userModel.findById(userId)
        let cartData = await userData.cartData;

        res.json({success:true, cartData});
        
    } catch (error) {
        console.log(error);
        res.json ({succes:false, message:error.message})
    }

}

export{addToCart,updateCart,getUserCart}