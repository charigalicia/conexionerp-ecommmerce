import ensureEnvLoaded from '../config/loadEnv.js';
ensureEnvLoaded();

import mongoose from 'mongoose';
import { syncProductToERP } from '../services/erpProductService.js';

console.log('Variables de entorno:');
console.log('ERPNEXT_URL:', process.env.ERPNEXT_URL);
console.log('ERPNEXT_API_KEY:', process.env.ERPNEXT_API_KEY);
console.log('ERPNEXT_API_SECRET:', process.env.ERPNEXT_API_SECRET ? 'Configurado' : 'No configurado');

// Producto de prueba
const testProduct = {
  _id: new mongoose.Types.ObjectId(),
  name: "Vino de Prueba",
  description: "Este es un vino de prueba para verificar la sincronización con ERPNext",
  category: "Francia",
  subCategory: "Rojo",
  price: 299.99,
  image: ["https://ejemplo.com/imagen.jpg"],
  sizes: ["750ml"],
  bestseller: true,
  date: Date.now()
};

async function syncTest() {
  try {
    console.log('Iniciando sincronización de producto de prueba...');
    
    // Sincronizar producto de prueba
    const result = await syncProductToERP(testProduct);
    
    console.log('Producto sincronizado exitosamente:');
    console.log(result);
    
    process.exit(0);
  } catch (error) {
    console.error('Error en la sincronización de prueba:', error);
    process.exit(1);
  }
}

// Ejecutar la sincronización de prueba
syncTest();