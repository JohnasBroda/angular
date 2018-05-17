import { CartService } from './cart.service';
import { Injectable } from '@angular/core';
import { FireDbService } from './fire-db.service';
import { Order, Currency } from '../interfaces/order';
import { Store } from '@ngrx/store';
import { IAppState } from 'app/app.states';
import { User } from '@store/user/model';
import * as fromAuth from '@authState/index';
import { Observable } from 'rxjs/Observable';
import { map, switchMap } from 'rxjs/operators';
import { Customer, StripeObject, Source, Charge } from 'app/payment/models';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';


@Injectable()
export class PaymentService {

  readonly api = `${environment.functionsURL}/app`;

  private stripe = Stripe(environment.stripePublishable);
  public elements: any;
  private totalPrice: number;

  constructor(
    private cartSvc: CartService,
    private db: FireDbService,
    private store: Store<IAppState>,
    private http: HttpClient,
  ) {
    this.elements = this.stripe.elements();
  }

  public async pay() {
    this.cartSvc.totalPrice.subscribe(price => this.totalPrice = price);
    const pushKey = await this.db.getPushKey();
    let currentUser;
    this.store.select(fromAuth.selectUser).subscribe(user => currentUser = user);
    const order: Order = {
      id: pushKey,
      userId: currentUser.uid,
      price: this.totalPrice,
      currency: Currency.HUF,
      products: this.cartSvc.products,
      date: new Date(),
    };
    console.log(order);
    this.db.createOrder(order);
  }

  // get customer data
  public getCustomer() {
    const url = `${this.api}/customer/`;
    return this.http.get<Customer>(url);
  }

  // get a list of charges
  public getChatrges() {
    const url = `${this.api}/charges/`;
    return this.http.get<StripeObject>(url).pipe( map(res => res.data) );
  }

  public createCharge(card: any, amount: number): Observable<Charge> {
    const url = `${this.api}/charges/`;

    return Observable.fromPromise<Source>( this.stripe.createSource(card) ).pipe(
      switchMap(data => this.http.post<Charge>(url, { amount, sourceId: data.source.id }))
    );
  }

  public attachSource(card: any): Observable<Source> {
    const url = `${this.api}/sources/`;

    return Observable.fromPromise<Source>( this.stripe.createSource(card) ).pipe(
      switchMap(data => this.http.post<Source>(url, { sourceId: data.source.id }))
    );
  }

}
