module BuildGrpcObjects
  class << self
    def from_discount_to_response(discount)
      Discounts::DiscountResponse.new({
        discount: discount
      })
    end
  end
end
