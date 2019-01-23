###
# Abstract gRPC from the controllers
###
require 'rubygems'
require 'bundler/setup'

Bundler.require(:default)
Dotenv.load

require './lib/protos/discounts/discount_services_pb'
require './app'

class DiscountsService < Discounts::DiscountService::Service
  def get(request, _unused_call)
    DiscountsController.get(request)
  end
end
