// backend/scripts/syncAllOrders.js
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import orderModel from '../models/orderModel.js';
import { syncOrderToERP } from '../services/erpOrderService.js';
import connectDB from '../config/mongodb.js';

async function syncAllOrdersToERP() {
  try {
    console.log('Conectando a MongoDB...');
    await connectDB();
    console.log('Conexión a MongoDB establecida.');

    console.log('Obteniendo todos los pedidos...');
    const orders = await orderModel.find({}).sort({ date: 1 });
    console.log(`Se encontraron ${orders.length} pedidos para sincronizar.`);

    let success = 0;
    let failed = 0;

    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      try {
        console.log(`[${i+1}/${orders.length}] Sincronizando pedido: ${order._id}`);
        await syncOrderToERP(order);
        console.log(`✅ Sincronización exitosa: Pedido ${order._id}`);
        success++;
      } catch (error) {
        console.error(`❌ Error al sincronizar pedido ${order._id}:`, error.message);
        failed++;
      }
      
      // Pequeña pausa para evitar sobrecarga en la API
      if (i < orders.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    console.log('\n--- Resumen de sincronización de pedidos ---');
    console.log(`Total de pedidos: ${orders.length}`);
    console.log(`Sincronizados con éxito: ${success}`);
    console.log(`Fallidos: ${failed}`);
    console.log('-------------------------------------------');

    // Desconectar MongoDB
    await mongoose.disconnect();
    console.log('Proceso de sincronización de pedidos completado.');
  } catch (error) {
    console.error('Error en el proceso de sincronización:', error);
    process.exit(1);
  }
}

// Ejecutar la sincronización
syncAllOrdersToERP()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error no controlado:', err);
    process.exit(1);
  });
  
  
  
  
  
  