FROM node:lts-alpine

WORKDIR /web

COPY package*.json .
RUN npm install

RUN npm i -g @angular/cli
RUN npm i -g lite-server

COPY . .
RUN npm run build

EXPOSE 4200
