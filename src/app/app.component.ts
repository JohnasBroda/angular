import { Component } from '@angular/core';
import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild } from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import { RouterState } from '@angular/router/src/router_state';
import { RouterOutlet } from '@angular/router/src/directives/router_outlet';
import { OnInit, DoCheck } from '@angular/core/src/metadata/lifecycle_hooks';
import { Store } from '@ngrx/store';
import { Message } from 'primeng/api';
import { ToastService } from '@services/utils/toast.service';
import { IAppState } from '@store/app.states';


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

  public router;
  public messages: Message[];
  public routerState: Observable<any>;

  constructor(
    private store: Store<IAppState>,
    private toaster: ToastService) {}

  public ngOnInit() {
    this.store.select(state => state.router).subscribe(state => {
      this.router = state;
    });
  }

  public getPage(outlet: RouterOutlet) {
    return outlet.activatedRouteData['page'] || 'access-denied';
  }

  ngDoCheck() {
    this.messages = this.toaster.messages;
  }
}
