FROM node:18.16.1-alpine
RUN apk update && apk add tzdata
ENV TZ=America/Bogota
ENV APP_ENV=develop
WORKDIR /usr/src
COPY ./src .
RUN npm install
EXPOSE 3000
CMD npm start