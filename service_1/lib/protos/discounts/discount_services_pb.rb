# Generated by the protocol buffer compiler.  DO NOT EDIT!
# Source: discounts/discount.proto for package 'discounts'

require 'grpc'
# require 'discounts/discount_pb'
require './lib/protos/discounts/discount_pb'

module Discounts
  module DiscountService
    class Service

      include GRPC::GenericService

      self.marshal_class_method = :encode
      self.unmarshal_class_method = :decode
      self.service_name = 'discounts.DiscountService'

      rpc :Get, DiscountRequest, DiscountResponse
    end

    Stub = Service.rpc_stub_class
  end
end