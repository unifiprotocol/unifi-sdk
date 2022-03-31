FROM node:16.14.2

# it already has yarn

WORKDIR /app

COPY ./package.json .
COPY yarn.lock .

RUN yarn
