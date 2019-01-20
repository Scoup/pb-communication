import { Router, Request, Response, NextFunction, Express } from 'express';
import { ProductsService } from '../services/products.service';
import { User } from '../protos/users/user_pb';

export class ProductRouter {
  public router = Router();
  public service = new ProductsService();

  constructor() {
    this.init();
  }

  public init() {
    this.router.get('/', this.get);
  }

  public getUser(req: Request): User | null {
    let id = req.header('X-USER-ID');
    if(!id) return null;

    let user = new User();
    user.setId(id);
    return user;
  }

  public get(req: Request, res: Response, next: NextFunction) {
    let user = this.getUser(req)
    this.service
      .getWithDiscounts(user)
      .then((products) => {
        res.send(products.map((p) => p.toObject(true)));
      });
  }
}
