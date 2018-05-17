import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { tap, take, map } from 'rxjs/operators';
import { IAppState } from 'app/app.states';
import { Store } from '@ngrx/store';
import { QueryConfig, Product, IProductsState } from '@store/products';

@Injectable()
export class PaginationService {

  // sources
  private _done = false;
  private _loading = false;
  private _data = [];
  private _cursor: Product | null;

  private query: QueryConfig;

  constructor(private afs: AngularFirestore, private store: Store<IAppState>) { }

  // initial query, seetting options and defining observables
  public init(config: QueryConfig): Observable<Partial<IProductsState>> {
    this.query = config;
    const first = this.afs.collection(this.query.path, ref => this.buildQuery(ref));
    return this.mapAndUpdate(first);
  }

  public more(config: QueryConfig): Observable<Partial<IProductsState>> {
    this.query = config;
    this._cursor = this.getCursor();
    const more = this.afs.collection(this.query.path, ref => {
      return this.buildQuery(ref).startAfter(this._cursor[this.query.field]);
    });
    return this.mapAndUpdate(more);
  }

  private mapAndUpdate(collection: AngularFirestoreCollection<any>) {
    if (this._loading) { return; }

    // loading
    this._loading = true;

    const listObservable = collection.snapshotChanges().pipe(
      map(arr => {
        let values = arr.map(snap => {
          const data = snap.payload.doc.data();
          const doc = snap.payload.doc.id;
          const product: Product = {
            ...<Product>data,
            id: doc,
          };
          return product;
        });

        // if prepend is true => reverse array
        values = this.query.prepend ? values.reverse() : values;

        // update source with new values
        this._data = values;
        this._done = values.length ? false : true;
        this._cursor = this.getCursor();

        return { products: values, done: this._done, query: { ...this.query, cursor: this._cursor } };
      }),
      take(1),
    );

    this._loading = false;

    return listObservable;
  }

  private buildQuery(ref): firebase.firestore.Query {

    if (this.query.searchTerm) {
      return ref.orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
                .where(this.query.field, this.query.operators[0], this.query.criterias[0])
                .where(this.query.field, this.query.operators[1], this.query.criterias[1])
                .where(`tags.${this.query.searchTerm}`, '==', true)
                .limit(this.query.limit);
    } else {
      return ref.orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
                  .where(this.query.field, this.query.operators[0], this.query.criterias[0])
                  .where(this.query.field, this.query.operators[1], this.query.criterias[1])
                  .limit(this.query.limit);
    }
  }

  private getCursor() {
    const current = this._data;
    if (current.length) {
      return this.query.prepend ? current[0] : current[current.length - 1];
    }
    return null;
  }
}
