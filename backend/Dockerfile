# Nâng cấp lên Node.js 20
FROM node:20-alpine

RUN apk update && apk upgrade

WORKDIR /usr/src/app

COPY package*.json ./

# Dùng npm install
RUN npm install

COPY . .

EXPOSE 5000
CMD [ "npm", "run", "dev" ]