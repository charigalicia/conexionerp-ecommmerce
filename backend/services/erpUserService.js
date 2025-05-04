// backend/services/erpUserService.js
import axios from 'axios';
import erpConfig from '../config/erpnext.js';
import { getAuthHeaders } from './erpAuthService.js';
import userModel from '../models/userModel.js'; // Añadir esta importación

async function syncUserToERP(user) {
    try {
      const headers = getAuthHeaders();
      
      // Verificar si el cliente ya existe en ERPNext
      const erpCustomerId = `ECOM-USER-${user._id.toString()}`;
      let existingCustomer;
      
      try {
        const response = await axios.get(
          `${erpConfig.baseUrl}/api/resource/Customer/${erpCustomerId}`,
          { headers }
        );
        existingCustomer = response.data.data;
      } catch (error) {
        existingCustomer = null;
      }
      
      // Formatear el nombre del cliente (si solo tiene email)
      const customerName = user.name || user.email.split('@')[0];
      
      // Mapear usuario a formato de cliente ERPNext
      const erpCustomer = {
        name: erpCustomerId,
        customer_name: customerName,
        customer_type: "Individual",
        customer_group: "Individual", // Asegúrate que este grupo exista en ERPNext
        territory: "All Territories", // Asegúrate que este territorio exista
        email_id: user.email,
      };
      
      console.log("Enviando datos de cliente a ERPNext:", erpCustomer);
      
      let response;
      try {
        if (existingCustomer) {
          // Actualizar cliente existente
          response = await axios.put(
            `${erpConfig.baseUrl}/api/resource/Customer/${erpCustomerId}`,
            { data: erpCustomer },
            { headers }
          );
        } else {
          // Crear nuevo cliente
          response = await axios.post(
            `${erpConfig.baseUrl}/api/resource/Customer`,
            { data: erpCustomer },
            { headers }
          );
        }
        return response.data.data;
      } catch (error) {
        if (error.response && error.response.data) {
          console.error("Respuesta de error de ERPNext:", JSON.stringify(error.response.data, null, 2));
        }
        throw error;
      }
    } catch (error) {
      console.error('Error al sincronizar usuario con ERPNext:', error.message);
      throw error;
    }
  }


  async function deleteUserFromERP(userId, userEmail) {
    try {
      const headers = getAuthHeaders();
      console.log(`Iniciando deleteUserFromERP con userId: ${userId}, email: ${userEmail}`);
      
      // Si tenemos email, buscar primero por email que es más confiable
      if (userEmail) {
        console.log(`Buscando cliente por email: ${userEmail}`);
        const customerResponse = await axios.get(
          `${erpConfig.baseUrl}/api/resource/Customer?filters=[["email_id","=","${userEmail}"]]`,
          { headers }
        );
        
        if (customerResponse.data.data && customerResponse.data.data.length > 0) {
          const foundCustomerId = customerResponse.data.data[0].name;
          console.log(`Cliente encontrado por email: ${foundCustomerId}`);
          
          // Deshabilitar el cliente encontrado
          await axios.put(
            `${erpConfig.baseUrl}/api/resource/Customer/${foundCustomerId}`,
            { data: { disabled: 1 } },
            { headers }
          );
          
          console.log(`Cliente ${foundCustomerId} deshabilitado en ERPNext`);
          return true;
        } else {
          console.log(`No se encontró cliente con email ${userEmail}`);
        }
      }
      
      // Si no se encuentra por email o no tenemos email, intentar con ID directo
      // ... resto del código existente ...
    } catch (error) {
      console.error(`Error completo al deshabilitar cliente:`, error);
      throw error;
    }
  }
  
  export { syncUserToERP, deleteUserFromERP };