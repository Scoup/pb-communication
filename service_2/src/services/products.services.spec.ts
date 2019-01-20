import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';

import { DB } from '../models/db';

import { Product } from '../models/product';
import { ProductsService } from './products.service';

import { Product as ProductPB } from '../protos/products/product_pb';
import { User } from '../protos/users/user_pb';

before((done)=> {
  DB.connect('localhost/test').then(() => done());
});

after((done) => {
  DB.disconnect().then(() => done());
});

beforeEach((done) => {
  done();
});

describe('ProductsService', () => {

  context('#getProducts', () => {
    beforeEach((done) => {
      Product.remove({}).then(() => {
        let product = new Product({
          title: 'Title',
          priceInCents: 150,
          description: 'Product test'
        });
        product.save().then(() => done()).catch(err => done(err));
      });
    });

    it('return the products as protocol buffer', (done) => {
      let service = new ProductsService();
      service.getProducts().then((products) => {
        expect(products.length).to.eq(1);
        let product = products[0];
        expect(product.getTitle()).to.eq('Title');
        expect(product.getDescription()).to.eq('Product test');
        expect(product.getPriceInCents()).to.eq(150);
        done();
      }).catch(err => done(err));
    });
  });

  context('#getWithDiscounts', () => {
    let service = new ProductsService();
    let stub;

    before(() => {
      let discountService = service.discountService;

      stub = sinon.stub(discountService, 'applyDiscounts')
        .callsFake((products: ProductPB[], user: User) => {
          return Promise.resolve(products);
      });
    });

    beforeEach((done) => {
      Product.remove({}).then(() => {
        let product = new Product({
          title: 'Title',
          priceInCents: 150,
          description: 'Product test'
        });
        product.save().then(() => done()).catch(err => done(err));
      });
    });

    it('return products if do not have user', (done) => {
      service.getWithDiscounts().then(() => {
        expect(stub.called).to.be.false;
        done();
      }).catch(err => done(err));
    });

    it('return products and apply discounts if have user', (done) => {
      let user = new User();
      service.getWithDiscounts(user).then(() => {
        expect(stub.called).to.be.true;
        done();
      }).catch(err => done(err));
    });
  });
});
