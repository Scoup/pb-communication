# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: products/product.proto

require 'google/protobuf'

require 'discounts/discount_pb'
Google::Protobuf::DescriptorPool.generated_pool.build do
  add_message "products.Product" do
    optional :id, :string, 1
    optional :price_in_cents, :int32, 2
    optional :title, :string, 3
    optional :description, :string, 4
    optional :discount, :message, 5, "discounts.Discount"
  end
end

module Products
  Product = Google::Protobuf::DescriptorPool.generated_pool.lookup("products.Product").msgclass
end
