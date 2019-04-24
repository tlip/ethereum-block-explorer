FROM node:10-alpine

RUN apk update && apk upgrade && apk add --no-cache bash git openssh
RUN apk add --update python krb5 krb5-libs gcc make g++ krb5-dev

ENV NODE_ENV production
ENV HOST 0.0.0.0

# Bundle APP files
COPY build .
COPY package.json .
COPY build/public public

RUN npm install --production

EXPOSE 3000

CMD [ "node", "server.js" ]