class DiscountsController
  class << self
    def get(request)
      user = User.where(id: request.user_id).first
      product = Product.where(id: request.product_id).first
      discount = DiscountService.new(product, user).discount

      not_found(request) unless discount.present?
      BuildGrpcObjects.from_discount_to_response(discount)
    end

    def not_found(request)
      raise GRPC::BadStatus.new(
        GRPC::Core::StatusCodes::NOT_FOUND,
        "Couldn't find discount for product(#{request.product_id})" \
        " and user(#{request.user_id})"
      )
    end
  end
end
