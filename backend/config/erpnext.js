// backend/config/erpnext.js
import ensureEnvLoaded from './loadEnv.js';
ensureEnvLoaded();

const erpConfig = {
    baseUrl: process.env.ERPNEXT_URL,
    apiKey: process.env.ERPNEXT_API_KEY,
    apiSecret: process.env.ERPNEXT_API_SECRET
  };
  
  console.log('Valores en erpConfig:', erpConfig);
  
  export default erpConfig;