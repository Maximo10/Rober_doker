FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . .
#Puerto por donde se expone el contenedor
EXPOSE 3000
#Comando para ejecutar la aplicacion
CMD ["node", "server.js"]