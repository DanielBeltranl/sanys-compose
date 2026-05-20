# Stage 1: Compilación de la aplicación
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Servidor web de producción
FROM nginx:1.25-alpine

# NUEVA LÍNEA: Reemplazar la configuración por defecto de Nginx con la nuestra
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos estáticos compilados desde el stage anterior
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]