import { selectUser } from './../../core/store/auth/index';
import { User } from './../../core/store/user/model';
import { IAppState } from './../../app.states';
import { Store } from '@ngrx/store';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PaymentService } from '../../services/payment.service';

import { Router } from '@angular/router';
import { IUser } from '@store/user/model';

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

  ngOnInit() {
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
