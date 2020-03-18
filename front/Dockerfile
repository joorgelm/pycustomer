FROM node:lts-alpine

MAINTAINER Jorge Melgarejo <melgarejo.colarte@gmail.com>

RUN mkdir -p /front

WORKDIR /front

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /front/package.json

COPY . /front

RUN npm install

RUN npm install -g @vue/cli

# start app
ENTRYPOINT ["npm", "run", "serve"]