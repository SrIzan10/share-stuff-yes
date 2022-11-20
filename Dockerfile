FROM node:lts-alpine

WORKDIR /app

COPY ./package.json .

RUN npm i

COPY . .

RUN npm run build

RUN mkdir dist/i

EXPOSE 8080

CMD cd dist;node index.js