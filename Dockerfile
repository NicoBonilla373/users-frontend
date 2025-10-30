# Imagen base de Node
FROM node:18-alpine

# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código del proyecto
COPY . .

# Exponer el puerto del servidor de desarrollo
EXPOSE 3000

# Comando por defecto para iniciar la app
CMD ["npm", "start"]
