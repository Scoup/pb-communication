# frozen_string_literal: true
class BirthdayDiscountService
  class << self
    def calculate(product, user)
      return unless user && days_until_birthday(user) == 0
      build_discount(product.price_in_cents)
    end

    def pct
      15.0
    end

    def build_discount(price = 0)
      Discounts::Discount.new({
        pct: pct,
        value_in_cents: price * (pct / 100)
      })
    end

    def days_until_birthday(user)
      birthday = user.date_of_birth
      bday = Date.new(Date.today.year, birthday.month, birthday.day)
      (bday - Date.today).to_i
    end
  end
end
