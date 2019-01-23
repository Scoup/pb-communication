# frozen_string_literal: true
class BlackFridayDiscountService

  DAYS_FOR_BLACK_FRIDAY = [
    Date.new(2019,11,2),
    Date.new(2019,11,3)
  ]

  class << self
    def calculate(product, user = nil)
      return unless DAYS_FOR_BLACK_FRIDAY.include? Date.today
      build_discount(product.price_in_cents)
    end

    def pct
      10.0
    end

    def build_discount(price = 0)
      Discounts::Discount.new({
        pct: pct,
        value_in_cents: price * (pct / 100)
      })
    end
  end
end
