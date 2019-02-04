# pb-communication

Example of two services using protocol buffers.

## Create Protocol

Protocols are defined on `protos` folder. You can use `docker-protoc` to generate the protocol for each platform (for more info read the README)

## Service 1

- Service using Ruby
- Get discount of user/product

## Service 2

- Service using node.js
- Get products from mongodb
- Try to apply discounts using service_1 if have an user
