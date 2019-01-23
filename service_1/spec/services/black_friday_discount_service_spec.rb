# frozen_string_literal: true
RSpec.describe BlackFridayDiscountService do
  describe '#calculate' do
    let(:day){ BlackFridayDiscountService::DAYS_FOR_BLACK_FRIDAY.first }
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

    before(:each) do
      Timecop.freeze(day)
    end

    after(:each) do
      Timecop.return
    end

    it 'return max pct if is black friday' do
      discount = BlackFridayDiscountService.calculate(product, user)
      expect(discount.pct).to eq 10
      expect(discount.value_in_cents).to eq 100
    end

    it 'return nothing if is not black friday' do
      Timecop.freeze(Date.new(2019,1,19))
      discount = BlackFridayDiscountService.calculate(product, user)
      expect(discount).to be_nil
    end
  end
end
