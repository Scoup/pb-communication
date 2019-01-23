# frozen_string_literal: true
RSpec.describe DiscountService do
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
      date_of_birth: Date.today - 25.years - 1.day
    })
  end

  subject { DiscountService.new(product, user) }

  context '#discount' do
    it 'return nil if there is no discount' do
      expect(subject.discount).to be_nil
    end

    it 'return the right discounts' do
      allow(subject).to receive(:discounts).and_return [10]
      expect(subject.discount.pct).to eq 10
    end

    it 'return max 15 pct on discounts' do
      allow(subject).to receive(:discounts).and_return [10, 20]
      expect(subject.discount.pct).to eq 15
    end

    it 'return sum discounts on discounts' do
      allow(subject).to receive(:discounts).and_return [5, 5]
      expect(subject.discount.pct).to eq 10
    end

    it 'calculate the right price' do
      allow(subject).to receive(:discounts).and_return [10]
      expect(subject.discount.value_in_cents).to eq 100
    end
  end

  context '#discounts' do
    it 'get discounts of BirthdayDiscountService and BlackFridayDiscountService' do
      allow(BirthdayDiscountService).to receive(:calculate).and_return 10
      allow(BlackFridayDiscountService).to receive(:calculate).and_return 5
      expect(subject.discounts).to eq [10,5]
    end

    it 'not return nil discounts' do
      allow(BirthdayDiscountService).to receive(:calculate).and_return nil
      allow(BlackFridayDiscountService).to receive(:calculate).and_return 5
      expect(subject.discounts).to eq [5]
    end
  end
end