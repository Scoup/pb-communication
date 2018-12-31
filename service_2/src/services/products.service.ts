import { DiscountRequest, DiscountResponse } from '../protos/discounts/discount_pb';
import { Product } from '../protos/products/product_pb';
import { DiscountsService } from './discounts.service';

export class ProductsService {
  discountService = new DiscountsService();

  public getWithDiscounts(user) {

  }

  public get() {
    this.products().forEach((product) => {
    });
  }

  public products() {
    return [
      new Product(),
      new Product(),
      new Product()
    ];
  }
}
