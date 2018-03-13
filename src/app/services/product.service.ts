import { Injectable } from '@angular/core';
import { FireDbService } from './fire-db.service';
import { Product } from '../interfaces/Product';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { CartService } from './cart.service';
import { FireAuthService } from './fire-auth-service.service';

@Injectable()
export class ProductService {

  constructor(
    private db: FireDbService,
    private router: Router,
    private cartSvc: CartService,
    private authSvc: FireAuthService) {}

    public editProduct(product: Product) {
      this.router.navigate(['/products', 'edit-product', product.name]);
    }

    public addToCart(product) {
      this.cartSvc.products.push(product);
    }

    public inspect(product: Product) {
      console.log(this.authSvc.currentUser);
      this.router.navigate(['/products', 'product', product.name]);
    }
}
