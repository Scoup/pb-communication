# frozen_string_literal: true
RSpec.describe DiscountsController do
  subject { DiscountsController }

  describe 'GET' do
    let(:day) { Date.new(2019,1,1) }
    let(:user) { User.new(date_of_birth: day - 15.years) }
    let(:product) { Product.new(price_in_cents: 100) }
    let(:request) { Discounts::DiscountRequest.new }

    before do
      user.save
      product.save
      Timecop.freeze(day)
    end

    before(:each) do
      request.user_id = user.id.to_s
      request.product_id = product.id.to_s
    end

    after do
      Timecop.return
    end

    it 'return the discount of product' do
      response = subject.get(request)
      discount = response.discount
      expect(discount.pct).to eq 15
      expect(discount.value_in_cents).to eq 15
    end

    it 'return not found if there is no discount' do
      request.user_id = ''
      error = subject.not_found(request)
      expect { subject.get(request) }.to raise_error error.to_s
    end
  end
end
