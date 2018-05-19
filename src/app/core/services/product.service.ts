import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { CartService } from './cart.service';
import { IProduct } from '@store/product';
import { FireDbService } from '@services/db/fire-db.service';

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
