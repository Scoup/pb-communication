// package: discounts
// file: discounts/discount.proto

var discounts_discount_pb = require("../discounts/discount_pb");
var grpc = require("grpc");

var DiscountService = (function () {
  function DiscountService() {}
  DiscountService.serviceName = "discounts.DiscountService";
  return DiscountService;
}());

DiscountService.Get = {
  methodName: "Get",
  service: DiscountService,
  requestStream: false,
  responseStream: false,
  requestType: discounts_discount_pb.DiscountRequest,
  responseType: discounts_discount_pb.DiscountResponse
};

exports.DiscountService = DiscountService;

function DiscountServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

DiscountServiceClient.prototype.get = function get(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(DiscountService.Get, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.DiscountServiceClient = DiscountServiceClient;

