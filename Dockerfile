FROM node:16

# Crear repositorio para la aplicación
WORKDIR /usr/src/app

# Instalamos dependencias
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "src/index.js"]