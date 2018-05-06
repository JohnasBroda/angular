import { Product } from './model';
import { IProductsState, QueryConfig } from './../reducer';
import { All, ProductActionTypes, UpdateState } from './actions';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import * as productActions from './actions';
import { tap } from 'rxjs/operators/tap';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument, QueryFn } from 'angularfire2/firestore';
import { IAppState } from 'app/app.states';
import { PaginationService } from 'app/services/pagination.service';

export type Action = productActions.All;

@Injectable()
export class ProductEffects {

    @Effect()
    loadProducts$: Observable<Action> = this.actions$.pipe(
        ofType(ProductActionTypes.LOAD_PRODUCTS),
        map((action: productActions.LoadProducts) => action.payload),
        tap(payload => this.payload = payload),
        switchMap(payload => this.loadProducts(payload)),
        map(partialState => this.updateState(partialState)),
        map(state => new productActions.UpdateState(state)),
        catchError(err => Observable.of(new productActions.ProductError(err)))
    );

    @Effect()
    addProduct$: Observable<Action> = this.actions$.pipe(
        ofType(ProductActionTypes.ADD_PRODUCT),
        map((action: productActions.AddProduct) => action.payload),
        tap(payload => this.payload = payload),
        switchMap(payload => {
            console.log(payload);
            return Observable.fromPromise(this.productsCollection.add(Object.assign({}, payload)));
            // add() takes a simple {}, no interfaces allowed!),
        }),
        map(() => new productActions.CreateProductSuccess(this.payload)),
        catchError(err => Observable.of(new productActions.ProductError(err)))
    );

    @Effect()
    addProducts$: Observable<Action> = this.actions$.pipe(
        ofType(ProductActionTypes.ADD_PRODUCTS),
        map((action: productActions.AddProducts) => action.payload),
        tap(payload => this.payload = payload),
        switchMap(payload => {
            const batch = this.afs.firestore.batch();
            payload.forEach((product: Product) => {
                batch.set(
                    this.afs.firestore.collection('products').doc(product.id),
                    Object.assign({}, product)
                );
                // add() takes a simple {}, no interfaces allowed!),
            });
            return Observable.fromPromise(batch.commit());
        }),
        map(() => new productActions.CreateProductsSuccess(this.payload)),
        catchError(err => Observable.of(new productActions.ProductError(err)))
    );

    private anonPushKey: string;
    private payload: any;
    private authData: any;
    private provider: any;
    private productsCollection: AngularFirestoreCollection<Product>;
    private productDoc: AngularFirestoreDocument<Product>;

    constructor(
        private actions$: Actions,
        private store: Store<IAppState>,
        private afs: AngularFirestore,
        private paginationService: PaginationService) {
        this.productsCollection = this.afs.collection<Product>('products');
    }

    private loadProducts(config: QueryConfig) {
        switch (config.cursor) {
            case null: {
                return this.paginationService.init(config);
            }
            default: {
                return this.paginationService.more(config);
            }
        }
    }

    private updateState(partialState: Partial<IProductsState>) {
        return {
            query: {
                ...this.payload as QueryConfig,
                cursor: partialState.query.cursor,
            },
            done: partialState.done,
            products: [ ...partialState.products ],
            reset: this.payload.cursor === null,
        };
    }
}
