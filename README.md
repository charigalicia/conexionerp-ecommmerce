# Ecommerce Project

Este es un proyecto de ecommerce (no original) desarrollado para mi clase (y no reprobar) utilizando el stack MERN (MongoDB, Express.js, React.js, Node.js). El proyecto está estructurado en tres partes principales: **Backend**, **Frontend (React)** y **Admin (React)**.

## Descripción

Este repositorio contiene el código para un ecommerce. Está compuesto por:

- **Backend**: Gestiona la lógica de negocio y las interacciones con la base de datos (MongoDB), utilizando Node.js y Express.js.
- **Frontend (React)**: La interfaz de usuario del ecommerce, desarrollada con React.js.
- **Admin (React)**: Interfaz de administración para gestionar productos, pedidos y usuarios, también desarrollada con React.js.

## Requisitos previos

Antes de ejecutar el proyecto en tu máquina, asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/) (recomendado LTS)
- [MongoDB](https://www.mongodb.com/try/download/community) (si vas a usar tu propia base de datos localmente)
- [Git](https://git-scm.com/) (para clonar el repositorio y gestionar el código fuente)


## Instalación

1. **Clona el repositorio** en tu máquina local:

   ```bash
   git clone https://github.com/charigalicia/negocios-elec-dos.git

Accede a la carpeta del proyecto:

 ```bash

cd tu-repositorio

 ```


## Dependencias
Instala las dependencias para las tres partes del proyecto.


**Dependencias del Frontend**

 ```bash

cd ../frontend

npm install 

 ```

- **react-router-dom**: PBiblioteca de enrutamiento para navegación entre componentes sin recargar la página
- **react-toastify**: Biblioteca para interactuar con MongoDB
- **react-dom**: Paquete que permite renderizar componentes React en el DOM del navegador
- **tailwindcss**: Framework CSS de utilidades para diseñar interfaces rápidamente mediante clases predefinidas
- **postcss**: Herramienta que transforma y optimiza CSS usando plugins JavaScript
- **autoprefixer**: Plugin de PostCSS que añade automáticamente prefijos para compatibilidad entre navegadores
- **axios**: Cliente HTTP basado en promesas para realizar peticiones a APIs desde el navegador o Node.js


**Dependencias del Backend**

 ```bash

cd backend

npm install 
 ```

- **express**: Framework web para Node.js que facilita la creación de APIs
- **mongoose**: Biblioteca para interactuar con MongoDB
- **cors**: Permite solicitudes HTTP desde diferentes dominios
- **dotenv**: Carga variables de entorno desde archivos .env
- **jsonwebtoken**: Genera y verifica tokens JWT para autenticación
- **bcrypt**: Encripta contraseñas para almacenarlas de forma segura
- **cloudinary**: Servicio para almacenamiento y gestión de imágenes en la nube
- **multer**: Middleware para manejar la subida de archivos
- **validator**: Valida y sanitiza datos de entrada
- **stripe**: Pasarela de pago para procesar transacciones
- **nodemon**: Herramienta de desarrollo que reinicia automáticamente el servidor


**Dependencias de Admin**

 ```bash

cd ../admin

npm install 
 ```

- **react-router-dom**: PBiblioteca de enrutamiento para navegación entre componentes sin recargar la página
- **react-toastify**: Biblioteca para interactuar con MongoDB
- **axios**: Cliente HTTP basado en promesas para realizar peticiones a APIs desde el navegador o Node.js



## Configura las variables de entorno:

Crea un archivo .env en las carpetas correspondientes (backend, admin, frontend), y añade las variables de entorno necesarias. 

Ejemplo para el backend:

 ```bash

PORT=4000

MONGODB_URI=tu_uri_de_mongodb

JWT_SECRET=tu_clave_secreta_jwt

CLOUDINARY_NAME=tu_cloudinary_name

CLOUDINARY_API_KEY=tu_api_key

CLOUDINARY_SECRET_KEY=tu_secret_key

ADMIN_EMAIL ="tu_admin_email"

ADMIN_PASSWORD="tu_admin_contraseña"

STRIPE_SECRET_KEY="Tu_secret_key_api_stripe"

ERPNEXT_URL="tu_url_erpnext"

ERPNEXT_API_KEY="tu_api_key"

ERPNEXT_API_SECRET="tu_api_secret"

 ```

 Ejemplo para el frontend y admin:

 ```bash
VITE_BACKEND_URL='http://localhost:4000'
 ```

Nota: Asegúrate de no subir tus archivos .env a tu repositorio, ya que contienen información sensible como claves de acceso. Es recomendable tener el archivo .env ignorado en el repositorio con el archivo .gitignore, como se encuentra en este proyecto.

####################################################
## Ejecutar el proyecto

**Para ejecutar el Backend:**

En la carpeta backend, usa el siguiente comando:

 ```bash

npm run server

 ```


**Para ejecutar  Frontend (React):**


En la carpeta frontend, usa:


 ```bash

npm run dev
 ```

**Para ejecutar Admin (React):**

En la carpeta admin, usa:


 ```bash

npm run dev

 ```

Esto iniciará la aplicación de administración.


¡Gracias por utilizar este proyecto!


