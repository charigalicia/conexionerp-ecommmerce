// backend/scripts/disableCustomer.js
import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import erpConfig from '../config/erpnext.js';
import { getAuthHeaders } from '../services/erpAuthService.js';

async function disableCustomerByName(customerName) {
  try {
    const headers = getAuthHeaders();
    
    // Buscar por nombre en ERPNext
    const customerResponse = await axios.get(
      `${erpConfig.baseUrl}/api/resource/Customer?filters=[["customer_name","=","${customerName}"]]`,
      { headers }
    );
    
    if (customerResponse.data.data && customerResponse.data.data.length > 0) {
      const erpCustomerId = customerResponse.data.data[0].name;
      
      // Deshabilitar el cliente
      await axios.put(
        `${erpConfig.baseUrl}/api/resource/Customer/${erpCustomerId}`,
        { data: { disabled: 1 } },
        { headers }
      );
      
      console.log(`Cliente "${customerName}" (${erpCustomerId}) deshabilitado exitosamente en ERPNext`);
    } else {
      console.error(`No se encontró cliente con nombre "${customerName}" en ERPNext`);
    }
  } catch (error) {
    console.error('Error al deshabilitar cliente:', error.message);
  }
}

// Ejecutar con el nombre del cliente a deshabilitar
const customerNameToDisable = process.argv[2];

if (!customerNameToDisable) {
  console.error('Por favor proporciona el nombre del cliente a deshabilitar');
  process.exit(1);
}

disableCustomerByName(customerNameToDisable)
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });