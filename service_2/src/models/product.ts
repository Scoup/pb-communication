import { Model } from 'mongorito';
import { Product as ProductPb } from '../protos/products/product_pb';

export class Product extends Model {

  public toProtocol(): ProductPb {
    let product = new ProductPb();
    product.setId(this.get('_id'));
    product.setTitle(this.get('title'));
    product.setPriceInCents(this.get('priceInCents'));
    product.setDescription(this.get('description'));
    return product;
  }
}
