FROM node:latest

ENV NODE_ENV=development
ENV PORT=4000
ENV DATABASE_SERVER=localhost:27017
ENV DATABASE_NAME=development

COPY . /var/www
WORKDIR /var/www

RUN npm install
RUN npm rebuild

EXPOSE $PORT

ENTRYPOINT ["npm", "start"]
