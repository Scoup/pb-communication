import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';

import { DiscountsService } from './discounts.service';
import { DiscountServiceClient, ServiceError } from '../protos/discounts/discount_pb_service';

import { DiscountRequest, DiscountResponse, Discount } from '../protos/discounts/discount_pb';
import { Product } from '../protos/products/product_pb';
import { User } from '../protos/users/user_pb';

describe('DiscountsService', () => {

  context('#get', () => {
    let subject: DiscountsService;
    let user: User;
    let product: Product;
    let discount: Discount;
    beforeEach(() => {
      subject = new DiscountsService();
      user = new User();
      product = new Product();
      discount = new Discount();
    });

    it('uses product.id and user.id as params', (done) => {
      user.setId('user_1');
      product.setId('product_1');
      sinon.stub(subject.service, 'get').callsFake((request: DiscountRequest, callback) => {
        expect(request.getUserId()).to.eq('user_1');
        expect(request.getProductId()).to.eq('product_1');
        callback(null, new DiscountResponse());
      });

      subject.get(product, user).then((data) => {
        done();
      }).catch((err) => {
        done(err);
      });
    });

    it('return the discount if success', (done) => {
      sinon.stub(subject.service, 'get').callsFake((request: DiscountRequest, callback) => {
        let response = new DiscountResponse();
        discount.setValueInCents(500);
        response.setDiscount(discount);
        callback(null, response);
      });

      subject.get(product, user).then((data) => {
        expect(data.getValueInCents()).to.eq(500);
        done();
      }).catch((err) => {
        done(err);
      });
    });

    it('return error if failed', (done) => {
      let error: ServiceError = { code: 123, message: 'error', metadata: null };
      sinon.stub(subject.service, 'get').callsFake((request: DiscountRequest, callback) => {
        callback(error, null);
      });

      subject.get(product, user).catch((err) => {
        expect(err).to.eq(error);
        done();
      });
    });
  });

  context('#applyDiscount', () => {
    let subject: DiscountsService;
    let user: User;
    let product: Product;
    let discount: Discount;
    beforeEach(() => {
      subject = new DiscountsService();
      user = new User();
      product = new Product();
      discount = new Discount();
    });

    it('get request with user and product')
    it('apply discount on product and return it')
    it('return product without discount if call fails')
  });

  context('#applyDiscounts', () => {
    let subject: DiscountsService;
    let user: User;
    let product: Product;
    let discount: Discount;
    beforeEach(() => {
      subject = new DiscountsService();
      user = new User();
      product = new Product();
      discount = new Discount();
    });

    it('get request with all products with user')
    it('return all products even if discounts fails')
  });
});
