FROM node:17-alpine

# install docker
RUN apk add --update curl docker openrc
RUN rc-update add docker boot

WORKDIR /usr/app

COPY ./debug/package.json ./package.json
RUN npm install --silent --unsafe-perm --no-audit --no-progress

COPY ./debug/index.js ./index.js
COPY ./DockerEventStream.js ./DockerEventStream.js

CMD npm run start
