import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';

import { ProductRouter } from './routes/products.router';
import { DB } from './models/db';


export class App {
  public express: express.Application;
  constructor() {
    this.express = express();
    this.startDb();
    this.middleware();
    this.routes();
  }

  private startDb() {
    DB.connect();
  }

  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    let router = express.Router();
    router.get('/', (req, res, next) => {
      res.json({
        message: 'Hello World!'
      });
    });
    this.express.use('/', router);
    this.express.use('/product', new ProductRouter().router);
  }
}
