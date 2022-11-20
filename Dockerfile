FROM node:lts-alpine

LABEL org.opencontainers.image.source="https://github.com/SrIzan10/share-stuff-yes" \
      org.opencontainers.image.vendor="Sr Izan" \
      org.opencontainers.image.authors="Sr Izan <izan@srizan.ml>"

WORKDIR /app

COPY ./package.json .

RUN npm i

COPY . .

RUN npm run build

RUN mkdir dist/i

EXPOSE 8080

CMD cd dist;node index.js