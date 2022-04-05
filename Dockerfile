FROM node:alpine
ENV NODE_ENV=develop
WORKDIR /usr/src
COPY ./src .
RUN npm install
EXPOSE 8082
CMD npm start