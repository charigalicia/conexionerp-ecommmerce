import express from 'express';
import {loginUser, registerUser,adminLogin, deleteUser} from '../controllers/userController.js'

const userRouter=express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)
userRouter.post('/delete', deleteUser)

export default userRouter;