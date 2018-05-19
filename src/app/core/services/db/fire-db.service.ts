import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { map, first, reduce, mapTo, tap } from 'rxjs/operators';
import { Product } from '@store/product';
import { Order } from '@interfaces';

@Injectable()
export class FireDbService {
  public products$: Product[];

  constructor(
    public afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router) { }

    getProducts() {
      return this.db.list(`products`, ref => ref.orderByKey()).valueChanges();
    }

    getProductByName(name) {
      return new Promise((resolve, reject) => {
        const productRef = this.db.database.ref('products').orderByChild('name').equalTo(name).limitToFirst(1);
        const trigger = productRef.once('value', snapshot => {
          const data = snapshot.val();
          resolve(data[ 0 ]);
        });
      });
    }

    getUserByEmail(email: string) {
        const userRef = this.db.list('users', ref => ref.orderByChild('email'));
        return userRef.valueChanges();
    }

    getUserByMobileNumber(number: string) {
      const userRef = this.db.list('users', ref => ref.orderByChild('phone').equalTo(number).limitToFirst(1));
      return userRef.valueChanges();
    }

    checkEmailNotTaken(email: string) {
      return this.db.list('users', ref => ref.orderByChild('email').equalTo(email)).valueChanges().pipe(
        map(response => !response.length),
        first(),
      );
    }

    createOrder(order: Order) {
      const ref = this.db.list('orders');
      ref.push(order);
    }

    public async getPushKey() {
      return await this.db.createPushId();
    }

  }
