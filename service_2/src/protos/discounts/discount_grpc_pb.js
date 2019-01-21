// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var discounts_discount_pb = require('../discounts/discount_pb.js');

function serialize_discounts_DiscountRequest(arg) {
  if (!(arg instanceof discounts_discount_pb.DiscountRequest)) {
    throw new Error('Expected argument of type discounts.DiscountRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_discounts_DiscountRequest(buffer_arg) {
  return discounts_discount_pb.DiscountRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_discounts_DiscountResponse(arg) {
  if (!(arg instanceof discounts_discount_pb.DiscountResponse)) {
    throw new Error('Expected argument of type discounts.DiscountResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_discounts_DiscountResponse(buffer_arg) {
  return discounts_discount_pb.DiscountResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var DiscountServiceService = exports.DiscountServiceService = {
  get: {
    path: '/discounts.DiscountService/Get',
    requestStream: false,
    responseStream: false,
    requestType: discounts_discount_pb.DiscountRequest,
    responseType: discounts_discount_pb.DiscountResponse,
    requestSerialize: serialize_discounts_DiscountRequest,
    requestDeserialize: deserialize_discounts_DiscountRequest,
    responseSerialize: serialize_discounts_DiscountResponse,
    responseDeserialize: deserialize_discounts_DiscountResponse,
  },
};

exports.DiscountServiceClient = grpc.makeGenericClientConstructor(DiscountServiceService);
