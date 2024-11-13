# Dockerfile
FROM node:16

WORKDIR /usr/app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install
RUN npm install -g ts-node typescript

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]