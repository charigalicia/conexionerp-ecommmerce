// backend/scripts/testDeleteUser.js
import dotenv from 'dotenv';
dotenv.config();

import { deleteUserFromERP } from '../services/erpUserService.js';

async function testDeleteUser() {
  try {
    const userId = process.argv[2]; // ID del usuario a eliminar
    const userEmail = process.argv[3]; // Email opcional como respaldo
    
    console.log(`Intentando deshabilitar usuario ${userId} en ERPNext...`);
    
    const result = await deleteUserFromERP(userId, userEmail);
    
    if (result) {
      console.log('Usuario deshabilitado exitosamente en ERPNext');
    }
  } catch (error) {
    console.error('Error durante la prueba:', error.message);
  }
}

if (!process.argv[2]) {
  console.error('Por favor proporciona el ID del usuario a deshabilitar');
  process.exit(1);
}

testDeleteUser()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });