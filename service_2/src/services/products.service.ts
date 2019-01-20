import { DiscountRequest, DiscountResponse } from '../protos/discounts/discount_pb';
import { Product } from '../protos/products/product_pb';
import { Product as Model } from '../models/product';
import { DiscountsService } from './discounts.service';
import { User } from '../protos/users/user_pb';

export class ProductsService {
  public discountService = new DiscountsService();

  public getWithDiscounts(user?: User): Promise<Product[]> {
    if(!user) return this.getProducts();
    return this.getProducts()
      .then((products) => this.discountService.applyDiscounts(products, user));
  }

  public getProducts(): Promise<Product[]> {
    return Model
      .find()
      .then((products) => products.map((product) => product.toProtocol()));
  }
}
