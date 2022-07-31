FROM node:16-alpine

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

CMD [ "sh", "-c", "npm run start:dev"]