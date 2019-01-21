# List Products

You can list products on `/product` and get list of products.

Optional: send `X-USER-ID` on header to get discounts!!

## Install

- Install node.js and npm
- `npm install`

## Test

- start mongodb: `docker run -d --name testmongo -p 27017:27017 -p 28017:28017 -e AUTH=no mongo`
- `npm test`


## Building protos

It uses the /protos to build the javascript/typescript files.

```
$ npm run build:protos
```
