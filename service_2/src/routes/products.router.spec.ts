import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';

import { DB } from '../models/db';

import { Product } from '../models/product';

import { Product as ProductPB } from '../protos/products/product_pb';
import { User } from '../protos/users/user_pb';

import * as supertest from 'supertest';
import { App } from '../app';

describe('ProductsRouter', () => {
  let api, server, app;

  before((done)=> {
    app = new App().express;
    server = app.listen(4000, () => {
      api = supertest('localhost:4000');
      DB.connect('localhost/test').then(() => done());
    });
  });

  after((done) => {
    server.close(() => {
      DB.disconnect().then(() => done());
    });
  });

  afterEach((done) => {
    Product.remove({}).then(() => done());
  });

  context('/product', () => {
    beforeEach((done) => {
      let product = new Product({
        title: 'Title',
        priceInCents: 150,
        description: 'Product test'
      });
      product.save().then(() => done()).catch(err => done(err));
    });


    it('return an array of products', (done) => {
      api.get('/product')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res) => {
          expect(res.body.length).to.eq(1);
          expect(res.body[0].title).to.eq('Title');
        })
        .end((err) => done(err));
    });
  });
});
