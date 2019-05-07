FROM node:10-alpine

# Istall packages necessary for web3.js
RUN apk update && apk upgrade && apk add --no-cache bash git openssh
RUN apk add --update python krb5 krb5-libs gcc make g++ krb5-dev

# Set some env vars
ENV NODE_ENV production
ENV HOST 0.0.0.0

# Install dependencies
COPY package.json .
RUN npm install --production

# Add built project files
COPY build .
COPY build/public public

EXPOSE 3000

CMD [ "node", "server.js" ]