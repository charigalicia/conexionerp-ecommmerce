// backend/services/erpAuthService.js
import erpConfig from '../config/erpnext.js';

// Log para verificar que los valores están disponibles
console.log('Auth Service - Valores de configuración:', erpConfig);

// Función para obtener headers autorizados usando token API
function getAuthHeaders() {
  return {
    'Authorization': `token ${erpConfig.apiKey}:${erpConfig.apiSecret}`,
    'Content-Type': 'application/json'
  };
}

export { getAuthHeaders };