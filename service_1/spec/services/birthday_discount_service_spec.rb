# frozen_string_literal: true
RSpec.describe BirthdayDiscountService do
  describe '#calculate' do
    let(:day){ Date.today }

    let(:product) do
      Product.create({
        price_in_cents: 1000,
        title: 'product 1'
      })
    end

    let(:user) do
      User.create({
        first_name: 'Peter',
        last_name: 'Parker',
        date_of_birth: day - 25.years
      })
    end

    it 'return max pct if is birthday of user' do
      discount = BirthdayDiscountService.calculate(product, user)
      expect(discount.pct).to eq 15
      expect(discount.value_in_cents).to eq 150
    end

    it 'return nothing if is not birthday of user' do
      user.date_of_birth = Date.tomorrow - 10.years
      discount = BirthdayDiscountService.calculate(product, user)
      expect(discount).to be_nil
    end
  end
end
