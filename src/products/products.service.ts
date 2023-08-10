import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  insertProduct(title: string, description: string, price: number) {
    const _id = Math.floor(Math.random() * 10).toString();
    const newProduct = new Product(_id, title, description, price);
    this.products.push(newProduct);

    return _id;
  }

  getProducts() {
    // return the copy of products
    return [...this.products];
  }

  getSingleProduct(productId: string) {
    const product = this.findProduct(productId)[0];

    if (!product) throw new NotFoundException('Product not found');

    return { ...product };
  }

  updateProduct(
    productId: string,
    prodTitle: string,
    prodDesc: string,
    prodPrice: number,
  ) {
    const [product, productIndex] = this.findProduct(productId);

    const updatedProduct = { ...product };
    if (prodTitle) {
      updatedProduct.title = prodTitle;
    }
    if (prodDesc) {
      updatedProduct.description = prodDesc;
    }
    if (prodPrice) {
      updatedProduct.price = prodPrice;
    }

    this.products[productIndex] = updatedProduct;
  }

  deleteProduct(productId: string) {
    const [, productIndex] = this.findProduct(productId);
    this.products.splice(productIndex, 1);
  }

  private findProduct(prodId: string): [Product, number] {
    const prodIndex = this.products.findIndex((prod) => prod.id === prodId);
    const product = this.products[prodIndex];

    if (!product) throw new NotFoundException('Product not found');

    return [product, prodIndex];
  }
}
