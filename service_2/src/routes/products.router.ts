import { Router, Request, Response, NextFunction, Express } from 'express';
import { ProductsService } from '../services/products.service';

export class ProductRouter {
  public router = Router();
  public service = new ProductsService();

  constructor() {
    this.init();
  }

  public init() {
    this.router.get('/', this.get);
  }

  public get(req: Request, res: Response, next: NextFunction) {
    res.send("Person");
  }
}
