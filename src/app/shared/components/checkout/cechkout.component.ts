import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User, selectUser } from '@store/auth';
import { IAppState } from '@store/app.states';
import { CartService } from '@services/cart.service';
import { PaymentService } from '@services/payment.service';

@Component({
  selector: 'app-cechkout',
  templateUrl: './cechkout.component.html',
  styleUrls: ['./cechkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public totalPrice$: Observable<number>;
  public currentUser$: Observable<User>;

  constructor(
    private cartSvc: CartService,
    private store: Store<IAppState>,
    private paymentSvc: PaymentService,
    private router: Router) { }

  public ngOnInit() {
    this.totalPrice$ = this.cartSvc.totalPrice;
    this.currentUser$ = this.store.select(selectUser);
  }

  public pay() {
    this.paymentSvc.pay();
  }

  public navigateToLogIn() {
    this.router.navigate(['login'], { queryParams: { redirectTo: 'checkout'}});
  }
}
