// backend/config/loadEnv.js
import dotenv from 'dotenv';
dotenv.config();

export default function ensureEnvLoaded() {
  if (!process.env.ERPNEXT_URL) {
    console.warn('¡Variables de entorno no cargadas! Intentando cargar dotenv...');
    dotenv.config();
  }
}