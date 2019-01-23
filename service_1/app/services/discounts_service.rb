# frozen_string_literal: true
class DiscountService

  attr_accessor :product
  attr_accessor :user

  MAX_PCT = 15

  def initialize(product, user)
    @product = product
    @user = user
  end

  def discount
    ds = discounts
    return if ds.size.zero?

    pct = calculate_pct(ds)
    Discounts::Discount.new({
      pct: pct,
      value_in_cents: product.price_in_cents * (pct / 100)
    })
  end

  def discounts
    [
      BirthdayDiscountService.calculate(@product, @user),
      BlackFridayDiscountService.calculate(@product, @user),
    ].compact
  end

  def calculate_pct(discounts)
    total_pct = discounts.inject { |sum, discount| sum + discount }
    [total_pct, MAX_PCT].min.to_f
  end
end
