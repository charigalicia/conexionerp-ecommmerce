// backend/scripts/testERPConnection.js
import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';

async function testConnection() {
  try {
    console.log('Intentando conexión con ERPNext en:', process.env.ERPNEXT_URL);
    console.log('Usando Client ID:', process.env.ERPNEXT_API_KEY);
    
    const response = await axios.post(
      `${process.env.ERPNEXT_URL}/api/method/frappe.integrations.oauth2.get_token`, 
      {
        client_id: process.env.ERPNEXT_API_KEY,
        client_secret: process.env.ERPNEXT_API_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: 'http://localhost:4000/api/erp/callback'
      }
    );
    
    console.log("Conexión exitosa:");
    console.log(response.data);
  } catch (error) {
    console.error("Error de conexión:");
    console.error(error.response ? error.response.data : error.message);
  }
}

testConnection();