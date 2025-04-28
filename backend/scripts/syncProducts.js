// backend/scripts/syncProducts.js
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import productModel from '../models/productModel.js';
import { syncProductToERP } from '../services/erpProductService.js';
import connectDB from '../config/mongodb.js';

async function syncAllProducts() {
  console.log('Iniciando sincronización de productos...');
  const products = await productModel.find({});
  let success = 0;
  let failed = 0;
  
  for (const product of products) {
    try {
      console.log(`Sincronizando producto: ${product.name}`);
      await syncProductToERP(product);
      success++;
    } catch (error) {
      console.error(`Error al sincronizar producto ${product._id}:`, error.message);
      failed++;
    }
  }
  
  console.log(`Sincronización de productos completada: ${success} exitosos, ${failed} fallidos`);
}

async function runSync() {
  try {
    // Usar tu función de conexión a MongoDB
    await connectDB();
    console.log('Conectado a MongoDB');
    
    // Sincronizar solo productos
    await syncAllProducts();
    
    console.log('Sincronización de productos completa con ERPNext');
    process.exit(0);
  } catch (error) {
    console.error('Error en la sincronización:', error);
    process.exit(1);
  }
}

// Ejecutar la sincronización
runSync();