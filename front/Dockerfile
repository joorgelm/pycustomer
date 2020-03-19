FROM node:12.16-slim

MAINTAINER Jorge Melgarejo <melgarejo.colarte@gmail.com>

RUN mkdir -p /front

WORKDIR /front

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /front/package.json

COPY . /front

RUN npm install -g @vue/cli@latest

RUN npm install

ENTRYPOINT ["npm", "run", "serve"]

EXPOSE 8000