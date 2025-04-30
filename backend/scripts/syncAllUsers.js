// backend/scripts/syncAllUsers.js
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import userModel from '../models/userModel.js';
import { syncUserToERP } from '../services/erpUserService.js';
import connectDB from '../config/mongodb.js';

async function syncAllUsersToERP() {
  try {
    console.log('Conectando a MongoDB...');
    await connectDB();
    console.log('Conexión a MongoDB establecida.');

    console.log('Obteniendo todos los usuarios...');
    const users = await userModel.find({});
    console.log(`Se encontraron ${users.length} usuarios para sincronizar.`);

    let success = 0;
    let failed = 0;

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      try {
        console.log(`[${i+1}/${users.length}] Sincronizando usuario: ${user.email}`);
        await syncUserToERP(user);
        console.log(`✅ Sincronización exitosa: ${user.email}`);
        success++;
      } catch (error) {
        console.error(`❌ Error al sincronizar ${user.email}:`, error.message);
        failed++;
      }
      
      // Pequeña pausa para evitar sobrecarga en la API
      if (i < users.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    console.log('\n--- Resumen de sincronización de usuarios ---');
    console.log(`Total de usuarios: ${users.length}`);
    console.log(`Sincronizados con éxito: ${success}`);
    console.log(`Fallidos: ${failed}`);
    console.log('-------------------------------------------');

    // Desconectar MongoDB
    await mongoose.disconnect();
    console.log('Proceso de sincronización de usuarios completado.');
  } catch (error) {
    console.error('Error en el proceso de sincronización:', error);
    process.exit(1);
  }
}

// Ejecutar la sincronización
syncAllUsersToERP()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error no controlado:', err);
    process.exit(1);
  });