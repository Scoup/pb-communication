ARG grpc=1.17
ARG grpc_java=1.17

FROM namely/protoc-all:latest

RUN apk add nodejs nodejs-npm
RUN npm install -g ts-protoc-gen

ADD all/entrypoint.sh /usr/local/bin
RUN chmod +x /usr/local/bin/entrypoint.sh
