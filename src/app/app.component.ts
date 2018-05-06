import { ToastService } from './services/toast.service';
import { CartService } from './services/cart.service';
import { Component } from '@angular/core';
import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild } from '@angular/animations';
import { OnInit, DoCheck } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import { Message } from 'primeng/api';
import { IAppState } from 'app/app.states';
import { Store } from '@ngrx/store';
import { RouterState } from '@angular/router/src/router_state';
import { RouterStateUrl } from 'app/shared/utils/ngrx.router';
import { RouterOutlet } from '@angular/router/src/directives/router_outlet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('animRoutes', [
      transition('* <=> *', [
        group([
          query(':enter', [
            style({
              opacity: 0,
              // transform: 'translateY(9rem) rotate(-10deg)',
            }),
            animate(
              '.5s cubic-bezier(0, 1.8, 1, 1.8)',
              style({ opacity: 1, /* transform: 'translateY(0) rotate(0)' */ })
            ),
            animateChild()
            ],
            { optional: true }
          ),
          query(
            ':leave', [
              animate('.5s', style({ opacity: 0 })),
              animateChild()
            ],
            { optional: true }
          )
        ])
      ])
    ])
  ]
})
export class AppComponent implements OnInit, DoCheck {

  public navLinks = [
    { path: '/landing', label: 'Landing' },
    { path: '/login', label: 'Sign in' },
    { path: '/register', label: 'register' },
    { path: '/products', label: 'Products' },
    { path: '/acces-denied', label: 'No access' },
    { path: '/cart', label: 'cart' },
  ];

  public amountInCart: Observable<number>;
  public messages: Message[];
  public routerState: Observable<any>;
  public router;

  constructor(
    public cartSvc: CartService,
    private toaster: ToastService,
    private store: Store<IAppState>) {}

  ngOnInit() {
    this.amountInCart = this.cartSvc.amountInCart;
    this.store.select(state => state.router).subscribe(state => {
      this.router = state;
      console.log(this.router);
    });
  }

  ngDoCheck() {
    this.messages = this.toaster.messages;
  }

  public getPage(outlet: RouterOutlet) {
    return outlet.activatedRouteData['page'] || 'access-denied';
  }
}
