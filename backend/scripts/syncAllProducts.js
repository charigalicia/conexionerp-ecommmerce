// backend/scripts/syncAllProducts.js
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import productModel from '../models/productModel.js';
import { syncProductToERP } from '../services/erpProductService.js';
import connectDB from '../config/mongodb.js';

async function syncAllProductsToERP() {
  try {
    console.log('Conectando a MongoDB...');
    await connectDB();
    console.log('Conexión a MongoDB establecida.');

    console.log('Obteniendo todos los productos...');
    const products = await productModel.find({});
    console.log(`Se encontraron ${products.length} productos para sincronizar.`);

    let success = 0;
    let failed = 0;

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      try {
        console.log(`[${i+1}/${products.length}] Sincronizando: ${product.name}`);
        await syncProductToERP(product);
        console.log(`✅ Sincronización exitosa: ${product.name}`);
        success++;
      } catch (error) {
        console.error(`❌ Error al sincronizar ${product.name}:`, error.message);
        failed++;
      }
      
      // Pequeña pausa para evitar sobrecarga en la API
      if (i < products.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    console.log('\n--- Resumen de sincronización ---');
    console.log(`Total de productos: ${products.length}`);
    console.log(`Sincronizados con éxito: ${success}`);
    console.log(`Fallidos: ${failed}`);
    console.log('--------------------------------');

    // Desconectar MongoDB
    await mongoose.disconnect();
    console.log('Proceso de sincronización completado.');
  } catch (error) {
    console.error('Error en el proceso de sincronización:', error);
    process.exit(1);
  }
}

// Ejecutar la sincronización
syncAllProductsToERP()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error no controlado:', err);
    process.exit(1);
  });