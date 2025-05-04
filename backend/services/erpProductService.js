
import axios from 'axios';
import erpConfig from '../config/erpnext.js';
import { getAuthHeaders } from './erpAuthService.js';

async function syncProductToERP(product) {
  try {
    const headers = getAuthHeaders();

     // Agregar log para verificar URL y headers
     console.log('URL de ERPNext:', erpConfig.baseUrl);
     console.log('Headers de autenticación:', headers);
    
    // Verificar si el producto ya existe en ERPNext
    const erpItemCode = `ECOM-${product._id.toString()}`;
    let existingProduct;
    
    try {
      const response = await axios.get(
        `${erpConfig.baseUrl}/api/resource/Item/${erpItemCode}`,
        { headers }
      );
      existingProduct = response.data.data;
    } catch (error) {
      existingProduct = null;
    }
    
    // Mapear producto de tu modelo a formato ERPNext
    const erpProduct = {
      item_code: erpItemCode,
      item_name: product.name,
      item_group: "Vinos", // Asegúrate que este grupo exista en ERPNext
      description: product.description,
      is_stock_item: 1,
      stock_uom: "Unit",
      standard_rate: product.price,
      // Guardamos la categoría original como campos personalizados
      category: product.category,
      sub_category: product.subCategory
    };
    
    let response;
    if (existingProduct) {
      // Actualizar producto existente
      response = await axios.put(
        `${erpConfig.baseUrl}/api/resource/Item/${erpItemCode}`,
        { data: erpProduct },
        { headers }
      );
    } else {
      // Crear nuevo producto
      response = await axios.post(
        `${erpConfig.baseUrl}/api/resource/Item`,
        { data: erpProduct },
        { headers }
      );
    }
    
    return response.data.data;
  } catch (error) {
    console.error('Error al sincronizar producto con ERPNext:', error.message);
    throw error;
  }
}

// backend/services/erpProductService.js
// Añade esta nueva función

async function deleteProductFromERP(productId) {
    try {
      const headers = getAuthHeaders();
      const erpItemCode = `ECOM-${productId}`;
      
      // En ERPNext, normalmente no se eliminan los productos físicamente,
      // se marcan como deshabilitados
      const response = await axios.put(
        `${erpConfig.baseUrl}/api/resource/Item/${erpItemCode}`,
        { data: { disabled: 1 } }, // Deshabilitar en lugar de eliminar
        { headers }
      );
      
      return response.data.data;
    } catch (error) {
      // Si el producto no existe en ERPNext, consideramos que ya está "eliminado"
      if (error.response && error.response.status === 404) {
        return { success: true, message: "Producto no encontrado en ERPNext" };
      }
      
      console.error('Error al deshabilitar producto en ERPNext:', error.message);
      throw error;
    }
  }
  


export { syncProductToERP, deleteProductFromERP };