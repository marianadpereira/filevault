FROM node:18-alpine

WORKDIR /app

COPY src/azure-sa/package*.json ./

RUN npm install --production

COPY src/azure-sa/ .

EXPOSE 3000

CMD ["node", "index.js"]
