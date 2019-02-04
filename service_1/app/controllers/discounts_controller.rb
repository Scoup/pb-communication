class DiscountsController
  class << self
    def get(request)
      user = User.where(_id: request.user_id).first
      product = Product.where(_id: request.product_id).first
      discount = DiscountService.new(product, user).discount
      raise not_found(request) unless discount.present?
      BuildGrpcObjects.from_discount_to_response(discount)
    end

    def not_found(request)
      GRPC::BadStatus.new(
        GRPC::Core::StatusCodes::NOT_FOUND,
        "Couldn't find discount for product(#{request.product_id})" \
        " and user(#{request.user_id})"
      )
    end
  end
end
