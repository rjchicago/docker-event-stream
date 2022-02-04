FROM node:17-alpine

# install docker
RUN apk add --update curl docker openrc
RUN rc-update add docker boot

WORKDIR /usr/app
COPY . .
RUN npm install

CMD npm run start
