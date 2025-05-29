FROM node:21-alpine3.18

WORKDIR /app

COPY package*.json ./

RUN npm install  # bcrypt is built for correct platform

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]