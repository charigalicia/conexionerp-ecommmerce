import mongoose from "mongoose";
import {deleteUserFromERP} from '../services/erpUserService.js';

const userSchema =new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    cartData:{type:Object, default:{}}
},{minimize:false})

// Middleware para ejecutar antes de findByIdAndDelete
userSchema.pre('findOneAndDelete', async function(next) {
    console.log('Middleware pre-delete activado');
    try {
      // Guardar una referencia al documento que se va a eliminar
      const doc = await this.model.findOne(this.getQuery());
      if (doc) {
        console.log('Documento encontrado en pre-delete middleware:', doc._id);
        // Guardar datos temporalmente para usarlos en el middleware post
        this._userBeingDeleted = {
          _id: doc._id,
          email: doc.email
        };
      }
      next();
    } catch (error) {
      console.error('Error en middleware pre-delete:', error);
      next(error);
    }
  });
  
  // Middleware para ejecutar después de findByIdAndDelete
  userSchema.post('findOneAndDelete', async function(doc) {
    console.log('Middleware post-delete activado');
    try {
      if (doc) {
        console.log('Documento eliminado, sincronizando con ERPNext');
        try {
          // Importar dinámicamente porque no se puede acceder directamente en el middleware
          const { deleteUserFromERP } = await import('../services/erpUserService.js');
          await deleteUserFromERP(doc._id.toString(), doc.email);
          console.log('Usuario deshabilitado en ERPNext desde middleware');
        } catch (error) {
          console.error('Error al deshabilitar usuario en ERPNext desde middleware:', error);
        }
      } else if (this._userBeingDeleted) {
        console.log('Documento no disponible en post, usando datos guardados');
        try {
          const { deleteUserFromERP } = await import('../services/erpUserService.js');
          await deleteUserFromERP(
            this._userBeingDeleted._id.toString(),
            this._userBeingDeleted.email
          );
          console.log('Usuario deshabilitado en ERPNext desde middleware usando datos guardados');
        } catch (error) {
          console.error('Error al deshabilitar usuario con datos guardados:', error);
        }
      }
    } catch (error) {
      console.error('Error general en middleware post-delete:', error);
    }
  });

const userModel=mongoose.models.user || mongoose.model('user', userSchema);
export default userModel