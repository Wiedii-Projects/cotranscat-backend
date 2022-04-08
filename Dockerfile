FROM node:alpine
ENV NODE_ENV=develop
WORKDIR /usr/src
COPY ./src .
RUN npm install
EXPOSE 8000
CMD npm start