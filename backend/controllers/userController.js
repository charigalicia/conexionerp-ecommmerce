import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";
import 'dotenv/config'
import { syncUserToERP } from "../services/erpUserService.js";
import { deleteUserFromERP } from "../services/erpUserService.js";


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

                // Añadir sincronización con ERPNext
        try {
            await syncUserToERP(user);
            console.log("Usuario sincronizado con ERPNext correctamente");
        } catch (erpError) {
            console.error("Error al sincronizar usuario con ERPNext:", erpError.message);
            // No fallamos la operación principal si falla la sincronización
        }


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

const deleteUser = async (req, res) => {
    try {
      const { userId } = req.body;
      console.log('deleteUser llamado con userId:', userId);
      
      // Obtener email antes de eliminar
      const user = await userModel.findById(userId);
      console.log('Usuario encontrado:', user ? 'Sí' : 'No');
      const userEmail = user ? user.email : null;
      console.log('Email del usuario:', userEmail);
      
      // Eliminar usuario de MongoDB
      const deleteResult = await userModel.findByIdAndDelete(userId);
      console.log('Resultado de eliminación en MongoDB:', deleteResult ? 'Éxito' : 'Fallo');
      
      // Sincronizar con ERPNext
      try {
        console.log('Iniciando sincronización con ERPNext...');
        const erpResult = await deleteUserFromERP(userId, userEmail);
        console.log('Resultado de sincronización con ERPNext:', erpResult);
      } catch (erpError) {
        console.error('Error detallado al deshabilitar usuario en ERPNext:', erpError);
        console.error('Mensaje de error:', erpError.message);
        if (erpError.response) {
          console.error('Datos de respuesta:', erpError.response.data);
        }
      }
      
      res.json({ success: true, message: "Usuario eliminado" });
    } catch (error) {
      console.error('Error completo:', error);
      console.log('Mensaje de error:', error.message);
      res.json({ success: false, message: error.message });
    }
  };


export {loginUser, registerUser, adminLogin, deleteUser}
