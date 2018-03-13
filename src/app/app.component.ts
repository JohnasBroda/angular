import { Product } from './interfaces/Product';
import { CartService } from './services/cart.service';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public navLinks = [
    { path: '/landing', label: 'Landing' },
    { path: '/login', label: 'Sign in' },
    { path: '/register', label: 'register' },
    { path: '/products', label: 'Products' },
    { path: '/acces-denied', label: 'No access' },
    { path: '/cart', label: 'cart' },
  ];
  public amountInCart: Observable<number>;

  constructor(
    public cartSvc: CartService) {}

  ngOnInit() {
    this.amountInCart = this.cartSvc.amountInCart;
  }
}
