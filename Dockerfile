FROM node:16.17.0-alpine3.16
RUN apk update && apk add tzdata
ENV TZ=America/Bogota
ENV APP_ENV=develop
WORKDIR /usr/src
COPY ./src .
RUN npm install
EXPOSE 8000
CMD npm start