FROM node:17-alpine

# install docker
RUN apk add --update curl docker openrc
RUN rc-update add docker boot

WORKDIR /usr/app

COPY ./package.json ./package.json
RUN npm install --silent --unsafe-perm --no-audit --no-progress

COPY ./src ./src

CMD npm run start
