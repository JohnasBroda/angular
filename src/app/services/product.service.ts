import { Injectable } from '@angular/core';
import { FireDbService } from './fire-db.service';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { CartService } from './cart.service';
import { IProduct } from '@store/products';

@Injectable()
export class ProductService {

  constructor(
    private db: FireDbService,
    private router: Router,
    private cartSvc: CartService) {}

    public editProduct(product: IProduct) {
      this.router.navigate(['/products', 'edit-product', product.name]);
    }

    public addToCart(product) {
      this.cartSvc.products.push(product);
    }

    public inspect(product: IProduct) {
      this.router.navigate(['/products', 'product', product.name]);
    }
}
