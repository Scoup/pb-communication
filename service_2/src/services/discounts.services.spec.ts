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

    it('get request with user and product', (done) => {
      sinon.stub(subject, 'get').callsFake((p: Product, u: User) => {
        expect(p).to.eq(product);
        expect(u).to.eq(user);
        return Promise.resolve(discount);
      });

      subject.applyDiscount(product, user).then((data) => {
        done();
      }).catch(err => done(err));
    });

    it('apply discount on product and return it', (done) => {
      sinon.stub(subject, 'get').callsFake((p: Product, u: User) => {
        return Promise.resolve(discount);
      });

      subject.applyDiscount(product, user).then((data) => {
        expect(data.getDiscount()).to.eq(discount);
        done();
      }).catch(err => done(err));
    });

    it('return product without discount if call fails', (done) => {
      sinon.stub(subject, 'get').callsFake((p: Product, u: User) => {
        return Promise.reject('anything');
      });

      subject.applyDiscount(product, user).then((data) => {
        expect(data).to.eq(product);
        done();
      }).catch(err => done(err));
    });
  });

  context('#applyDiscounts', () => {
    let subject: DiscountsService;
    let user: User;
    let discount: Discount;
    let products: Product[];
    beforeEach(() => {
      subject = new DiscountsService();
      user = new User();
      discount = new Discount();
      products = [];
      products.push(new Product());
      products.push(new Product());
    });

    it('get request with all products with user', (done) => {
      sinon.stub(subject, 'get').callsFake((p: Product, u: User) => {
        return Promise.resolve(discount);
      });

      subject.applyDiscounts(products, user).then((products) => {
        products.forEach((product) => {
          expect(product.getDiscount()).to.eq(discount);
        });
        expect(products.length).to.eq(2);
        done();
      }).catch(err => done(err));
    });

    it('return all products even if discounts fails', (done) => {
      sinon.stub(subject, 'get').callsFake((p: Product, u: User) => {
        return Promise.reject('anything');
      });

      subject.applyDiscounts(products, user).then((products) => {
        products.forEach((product) => {
          expect(product.getDiscount()).not.to.eq(discount);
        });
        expect(products.length).to.eq(2);
        done();
      }).catch(err => done(err));
    })
  });
});
