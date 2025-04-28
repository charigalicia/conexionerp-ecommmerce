// backend/scripts/testBasicAuth.js
import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';

async function testBasicAuth() {
  try {
    console.log('Intentando conexión con ERPNext en:', process.env.ERPNEXT_URL);
    
    // Intentar obtener información de la instancia usando autenticación API key
    const response = await axios.get(
      `${process.env.ERPNEXT_URL}/api/method/frappe.auth.get_logged_user`, 
      {
        auth: {
          username: process.env.ERPNEXT_API_KEY,
          password: process.env.ERPNEXT_API_SECRET
        }
      }
    );
    
    console.log("Conexión exitosa con autenticación básica:");
    console.log(response.data);
    
    return true;
  } catch (error) {
    console.error("Error de conexión con autenticación básica:");
    console.error(error.response ? error.response.data : error.message);
    
    return false;
  }
}

// Intentemos ahora un enfoque con token de API
async function testApiToken() {
  try {
    console.log('\nIntentando conexión mediante token API:');
    
    // Crear una API key en Frappe también funciona
    const response = await axios.get(
      `${process.env.ERPNEXT_URL}/api/resource/User?fields=["name","username"]`,
      {
        headers: {
          'Authorization': `token ${process.env.ERPNEXT_API_KEY}:${process.env.ERPNEXT_API_SECRET}`
        }
      }
    );
    
    console.log("Conexión exitosa con token API:");
    console.log(response.data);
    
    return true;
  } catch (error) {
    console.error("Error de conexión con token API:");
    console.error(error.response ? error.response.data : error.message);
    
    return false;
  }
}

// Ejecutar las pruebas
async function runTests() {
  const basicAuthResult = await testBasicAuth();
  const apiTokenResult = await testApiToken();
  
  if (!basicAuthResult && !apiTokenResult) {
    console.log("\nNinguno de los métodos de autenticación funcionó.");
    console.log("Necesitamos verificar tus credenciales o la configuración de ERPNext.");
    console.log("Por favor, revisa lo siguiente:");
    console.log("1. Verifica que el API Key y Secret sean correctos");
    console.log("2. Asegúrate que el acceso a API esté habilitado en ERPNext");
    console.log("3. Podrías necesitar crear una API Key específica en ERPNext");
  }
}

runTests();