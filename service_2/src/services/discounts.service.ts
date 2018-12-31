import { DiscountServiceClient } from '../protos/discounts/discount_pb_service';
import { DiscountRequest, DiscountResponse, Discount } from '../protos/discounts/discount_pb';
import { Product } from '../protos/products/product_pb';
import { User } from '../protos/users/user_pb';

export class DiscountsService {
  public service = new DiscountServiceClient(process.env['DISCOUNT_API']);

  public get(product: Product, user: User): Promise<Discount> {
    let discountRequest = new DiscountRequest();
    discountRequest.setProductId(product.getId());
    discountRequest.setUserId(user.getId());

    return new Promise((resolve, reject) => {
      this.service.get(discountRequest, (error, data: DiscountResponse) => {
        if(error) return reject(error);
        resolve(data.getDiscount());
      });
    });
  }

  public applyDiscount(product: Product, user: User): Promise<Product> {
    return this.get(product, user)
      .then((discount) => {
        product.setDiscount(discount);
        return product;
      })
      .catch(() => product);
  }

  public applyDiscounts(products: Product[], user: User): Promise<Product[]> {
    let promises = products.map((product) => this.applyDiscount(product, user));
    return Promise.all(promises);
  }
}
