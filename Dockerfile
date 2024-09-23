FROM node:20-alpine

WORKDIR /var/www/api

COPY . .
COPY docker/.env .
RUN npm i -g pnpm && pnpm i

ENTRYPOINT pnpm runserver