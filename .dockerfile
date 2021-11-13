FROM node:16

WORKDIR /var/www/app

COPY package.json package-lock.json ./

RUN npm install -g pm2
RUN npm ci

EXPOSE 1234

COPY . ./

CMD ["pm2-runtime","--raw","--no-auto-exit","src/index.js"]
