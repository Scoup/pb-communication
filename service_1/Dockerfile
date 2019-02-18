FROM ruby:2.3.3

ENV DATABASE_SERVER=localhost:27017
ENV DATABASE_NAME=development
ENV SERVER_PATH=0.0.0.0:50052

COPY . /var/www
WORKDIR /var/www

RUN bundle install

EXPOSE $PORT

ENTRYPOINT ["ruby", "server.rb"]
