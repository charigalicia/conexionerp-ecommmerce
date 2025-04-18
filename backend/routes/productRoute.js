import express from 'express'
import upload from '../middleware/multer.js'
import adminAuth from '../middleware/adminAuth.js'
import {addProduct, listProducts, removeProduct, singleProduct} from '../controllers/productController.js'

const productRouter = express.Router();

productRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1}]),addProduct);
productRouter.post('/remove',adminAuth,removeProduct);
productRouter.post('/single',singleProduct);
productRouter.get('/list',listProducts);

export default productRouter
