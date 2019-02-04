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

  let(:discount_0) { Discounts::Discount.new(pct: 5) }
  let(:discount_1) { Discounts::Discount.new(pct: 10) }
  let(:discount_2) { Discounts::Discount.new(pct: 15) }
  let(:discount_3) { Discounts::Discount.new(pct: 20) }

  subject { DiscountService.new(product, user) }

  context '#discount' do
    it 'return nil if there is no discount' do
      expect(subject.discount).to be_nil
    end

    it 'return the right discounts' do
      allow(subject).to receive(:discounts).and_return [discount_1]
      expect(subject.discount.pct).to eq 10
    end

    it 'return max 15 pct on discounts' do
      allow(subject).to receive(:discounts).and_return [discount_1, discount_2]
      expect(subject.discount.pct).to eq 15
    end

    it 'return sum discounts on discounts' do
      allow(subject).to receive(:discounts).and_return [discount_0, discount_0]
      expect(subject.discount.pct).to eq 10
    end

    it 'calculate the right price' do
      allow(subject).to receive(:discounts).and_return [discount_1]
      expect(subject.discount.value_in_cents).to eq 100
    end
  end

  context '#discounts' do
    let(:discount_1) { Discounts::Discount.new(pct: 10) }
    let(:discount_2) { Discounts::Discount.new(pct: 5) }

    it 'get discounts of BirthdayDiscountService and BlackFridayDiscountService' do
      allow(BirthdayDiscountService).to receive(:calculate).and_return discount_1
      allow(BlackFridayDiscountService).to receive(:calculate).and_return discount_2
      expect(subject.discounts).to eq [discount_1,discount_2]
    end

    it 'not return nil discounts' do
      allow(BirthdayDiscountService).to receive(:calculate).and_return nil
      allow(BlackFridayDiscountService).to receive(:calculate).and_return discount_2
      expect(subject.discounts).to eq [discount_2]
    end
  end

  context '#calculate_pct' do
    let(:discounts) { [discount_1, discount_2] }

    it 'calculate the max discount' do
      expect(subject.calculate_pct(discounts)).to eq 15
    end

    it 'return the discount' do
      expect(subject.calculate_pct([discount_1])).to eq 10
    end
  end
end