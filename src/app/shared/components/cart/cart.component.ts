import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CartService } from '@services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public products: Observable<any[]>;
  public totalPrice: Observable<number>;
  public amountInCart: Observable<number>;

  constructor(private cartSvc: CartService, private router: Router) { }

  public ngOnInit() {
   this.products = this.cartSvc.changeEvent;
   this.totalPrice = this.cartSvc.totalPrice;
   this.amountInCart = this.cartSvc.amountInCart;
  }

  public clearCart() {
    this.cartSvc.emptyCart();
  }

  public remove(product) {
    this.cartSvc.removeProduct(product);
  }

  public checkOut() {
    this.router.navigate(['checkout']);
  }
}
