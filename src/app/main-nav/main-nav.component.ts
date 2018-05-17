import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { OnInit, DoCheck } from '@angular/core/src/metadata/lifecycle_hooks';
import { Message } from 'primeng/api';
import { CartService } from 'app/services/cart.service';
import { ToastService } from 'app/services/toast.service';
import { Store } from '@ngrx/store';
import { IAppState } from 'app/app.states';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);

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
    public cartSvc: CartService,
    private store: Store<IAppState>,
    private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.amountInCart = this.cartSvc.amountInCart;
  }
}
