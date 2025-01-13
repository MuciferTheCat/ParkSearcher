FROM node:22-alpine

RUN mkdir -p /app/node_modules

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5002

CMD [ "node", "server.js" ]