import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";
import 'dotenv/config'


const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//Route para Ingreso Usuario

const loginUser=async(req, res)=>{
    try {
        const {email,password}=req.body;
        const user =await userModel.findOne({email});

        if (!user) {
            return res.json({success:false,message:"El usuario no existe"})
            
        }

        const isMatch=await bcrypt.compare(password,user.password);

        if (isMatch){
            const token= createToken(user._id)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:'Credenciales invalidas'})
        }
        
    } catch (error) {
        console.log(error);
        res.json({succes:false,message:error.message})
        
    }


}

//Route para Registro Usuario
const registerUser = async(req,res)=>{
    try {
        const{name,email,password}=req.body;

        //checar si usuario existe o no
        const exists=await userModel.findOne({email});
        if (exists){
            return res.json({success:false, message:"El usuario ya existe"})
        }

        //validar formato email y contraseña fuerte
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Porfavor ingresa un correo válido"})
        }
        if(password.length<8){
            return res.json({success:false, message:"Porfavor ingresa una contraseña fuerte"})
        }

        // ocultar contraseña de usuario
        const salt=await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser=new userModel({
            name,
            email,
            password:hashedPassword
        })

        const user=await newUser.save()

        const token= createToken(user._id)

        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }

}

//Route para Ingreso Administrador

const adminLogin = async(req,res)=>{
    try {

        const {email,password}=req.body

        if (email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            res.json({success:true, token})
            
        } else {
            res.json({success:false, message:"Credenciales invalidas"})
            
        }
        
    } catch (error) {
        console.log(error);
        res.json({succes:false,message:error.message})
        
        
    }

}


export {loginUser, registerUser, adminLogin}
