// backend/services/erpOrderService.js
import axios from 'axios';
import erpConfig from '../config/erpnext.js';
import { getAuthHeaders } from './erpAuthService.js';
import userModel from '../models/userModel.js';

async function syncOrderToERP(order) {
  try {
    const headers = getAuthHeaders();
    
    // Obtener información del usuario para asociar el pedido
    const user = await userModel.findById(order.userId);
    if (!user) {
      throw new Error(`Usuario no encontrado para el pedido: ${order._id}`);
    }
    
    // Obtener lista de clientes de ERPNext
    const customerResponse = await axios.get(
      `${erpConfig.baseUrl}/api/resource/Customer?filters=[["email_id","=","${user.email}"]]`,
      { headers }
    );
    
    let erpCustomerId;
    
    if (customerResponse.data.data && customerResponse.data.data.length > 0) {
      // Usar el cliente existente encontrado por email
      erpCustomerId = customerResponse.data.data[0].name;
      console.log(`Cliente encontrado en ERPNext por email: ${erpCustomerId}`);
    } else {
      // Si no se encuentra por email, intentar por nombre
      const altCustomerResponse = await axios.get(
        `${erpConfig.baseUrl}/api/resource/Customer?filters=[["customer_name","=","${user.name || user.email.split('@')[0]}"]]`,
        { headers }
      );
      
      if (altCustomerResponse.data.data && altCustomerResponse.data.data.length > 0) {
        erpCustomerId = altCustomerResponse.data.data[0].name;
        console.log(`Cliente encontrado en ERPNext por nombre: ${erpCustomerId}`);
      } else {
        throw new Error(`No se pudo encontrar el cliente para el usuario: ${user.email}`);
      }
    }
    
    // Verificar si el pedido ya existe
    const erpSalesOrderId = `ECOM-ORDER-${order._id.toString()}`;
    let existingSalesOrder;
    
    try {
      const response = await axios.get(
        `${erpConfig.baseUrl}/api/resource/Sales Order/${erpSalesOrderId}`,
        { headers }
      );
      existingSalesOrder = response.data.data;
    } catch (error) {
      existingSalesOrder = null;
    }
    
    // Mapear estado del pedido a ERPNext
    let erpOrderStatus = "Draft";
    switch (order.status) {
      case "Order Placed":
        erpOrderStatus = "Draft";
        break;
      case "Processing":
        erpOrderStatus = "To Deliver and Bill";
        break;
      case "Shipped":
        erpOrderStatus = "To Bill";
        break;
      case "Delivered":
        erpOrderStatus = "Completed";
        break;
      case "Cancelled":
        erpOrderStatus = "Cancelled";
        break;
      default:
        erpOrderStatus = "Draft";
    }
    
    // Formatear dirección
    let addressText = "";
    if (order.address) {
      // Combinar campos de dirección si están disponibles
      const addressParts = [];
      if (order.address.street) addressParts.push(order.address.street);
      if (order.address.city) addressParts.push(order.address.city);
      if (order.address.state) addressParts.push(order.address.state);
      if (order.address.zipcode) addressParts.push(order.address.zipcode);
      if (order.address.country) addressParts.push(order.address.country);
      addressText = addressParts.join(", ");
    }
    
    // Primero, sincronizar los productos de la orden en ERPNext si no existen
    console.log("Verificando si los productos de la orden existen en ERPNext...");
    
    for (const item of order.items) {
      if (!item._id) {
        console.warn(`Item en orden ${order._id} no tiene _id, no se puede sincronizar:`, item);
        continue;
      }
      
      const productId = item._id.toString();
      const erpItemCode = `ECOM-${productId}`;
      
      // Verificar si el producto ya existe en ERPNext
      try {
        await axios.get(
          `${erpConfig.baseUrl}/api/resource/Item/${erpItemCode}`,
          { headers }
        );
        console.log(`Producto ${erpItemCode} ya existe en ERPNext.`);
      } catch (error) {
        // Si no existe, crearlo
        console.log(`Producto ${erpItemCode} no encontrado en ERPNext, creándolo...`);
        
        try {
          const erpProduct = {
            item_code: erpItemCode,
            item_name: item.name || `Producto ${productId}`,
            item_group: "Vinos", // Asegúrate que este grupo exista en ERPNext
            description: item.description || `Producto desde ecommerce: ${item.name}`,
            is_stock_item: 1,
            stock_uom: "Unidad(es)",
            standard_rate: item.price || 0,
            // Otros campos personalizados si quieres
            category: item.category || "Sin categoría",
            sub_category: item.subCategory || "Sin subcategoría"
          };
          
          await axios.post(
            `${erpConfig.baseUrl}/api/resource/Item`,
            { data: erpProduct },
            { headers }
          );
          
          console.log(`Producto ${erpItemCode} creado exitosamente en ERPNext.`);
        } catch (createError) {
          console.error(`Error al crear producto ${erpItemCode} en ERPNext:`, createError.message);
          if (createError.response && createError.response.data) {
            console.error("Detalles del error:", JSON.stringify(createError.response.data, null, 2));
          }
          throw new Error(`No se pudo sincronizar el producto ${item.name} para el pedido.`);
        }
      }
    }
    
    // Una vez que sabemos que todos los productos existen, armar los items del pedido
    const items = order.items.map(item => {
      if (!item._id) {
        throw new Error(`No se puede incluir producto sin ID en el pedido: ${JSON.stringify(item)}`);
      }
      
      return {
        item_code: `ECOM-${item._id.toString()}`,
        qty: item.quantity || 1,
        rate: item.price || 0
      };
    });
    
    // Crear objeto de pedido para ERPNext
    const salesOrder = {
      name: erpSalesOrderId,
      customer: erpCustomerId,
      transaction_date: new Date(order.date).toISOString().split('T')[0],
      delivery_date: new Date(new Date(order.date).getTime() + 7*24*60*60*1000).toISOString().split('T')[0],
      status: erpOrderStatus,
      order_type: "Sales",
      items: items,
      payment_status: order.payment ? "Paid" : "Unpaid",
      payment_method: order.paymentMethod || "COD",
      shipping_address: addressText,
      grand_total: order.amount || 0
    };
    
    console.log("Enviando datos de pedido a ERPNext:", JSON.stringify(salesOrder, null, 2));
    
    let response;
    try {
      if (existingSalesOrder) {
        // Actualizar pedido existente
        response = await axios.put(
          `${erpConfig.baseUrl}/api/resource/Sales Order/${erpSalesOrderId}`,
          { data: salesOrder },
          { headers }
        );
      } else {
        // Crear nuevo pedido
        response = await axios.post(
          `${erpConfig.baseUrl}/api/resource/Sales Order`,
          { data: salesOrder },
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
    console.error('Error al sincronizar pedido con ERPNext:', error.message);
    throw error;
  }
}

// Actualizar estado del pedido en ERPNext
async function updateOrderStatusInERP(orderId, status) {
  try {
    const headers = getAuthHeaders();
    
    // Mapear estado de tu sistema a ERPNext
    let erpOrderStatus = "Draft";
    switch (status) {
      case "Order Placed":
        erpOrderStatus = "Draft";
        break;
      case "Processing":
        erpOrderStatus = "To Deliver and Bill";
        break;
      case "Shipped":
        erpOrderStatus = "To Bill";
        break;
      case "Delivered":
        erpOrderStatus = "Completed";
        break;
      case "Cancelled":
        erpOrderStatus = "Cancelled";
        break;
      default:
        erpOrderStatus = "Draft";
    }
    
    const erpSalesOrderId = `ECOM-ORDER-${orderId}`;
    
    // Verificar si el pedido existe
    try {
      await axios.get(
        `${erpConfig.baseUrl}/api/resource/Sales Order/${erpSalesOrderId}`,
        { headers }
      );
    } catch (error) {
      console.warn(`Pedido ${erpSalesOrderId} no encontrado en ERPNext para actualizar estado`);
      return null;
    }
    
    // Actualizar el estado del pedido
    const response = await axios.put(
      `${erpConfig.baseUrl}/api/resource/Sales Order/${erpSalesOrderId}`,
      { data: { status: erpOrderStatus } },
      { headers }
    );
    
    return response.data.data;
  } catch (error) {
    console.error('Error al actualizar estado del pedido en ERPNext:', error.message);
    throw error;
  }
}

export { syncOrderToERP, updateOrderStatusInERP };