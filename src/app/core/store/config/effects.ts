import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import * as configActions from './actions';
import { tap } from 'rxjs/operators/tap';
import {
    AngularFirestoreCollection,
    AngularFirestore,
    AngularFirestoreDocument,
    QueryFn
} from 'angularfire2/firestore';
import { ConfigActionTypes } from './actions';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import index from 'caseless';
import { IAppState } from '@store/app.states';
import { PaginationService } from '@services/pagination.service';
import * as firebase from 'firebase/app';

export type Action = configActions.All;

@Injectable()
export class ConfigEffects {

    @Effect()
    public getProductCategories$: Observable<Action> = this.actions$.pipe(
        ofType(ConfigActionTypes.GET_PRODUCT_FILTERS),
        switchMap(() => this.loadProductCategories()),
        map((indexes) => new configActions.UpdateState(indexes)),
        catchError((err) => Observable.of(new configActions.ConfigError(err)))
    );

    constructor(
        private actions$: Actions,
        private rtlDb: AngularFireDatabase,
        private store: Store<IAppState>,
        private afs: AngularFirestore,
        private paginationService: PaginationService) {}

    private loadProductCategories(): Observable<any> {
        return this.rtlDb.list('productIndexes').snapshotChanges()
                .pipe(
                    map((indexes) => this.tranformIndexes(indexes))
                );
    }

    private tranformIndexes(indexes: Array<AngularFireAction<firebase.database.DataSnapshot>>): {} {
        const productIndexes = {};
        indexes.forEach((v, i) => {
            const data = indexes[i].payload.val();
            const flatData: any[] = [];
            for (const prop in data) {
                if (data.hasOwnProperty(prop)) {
                 const newIndexObj = {};
                 newIndexObj['name'] = prop;
                 newIndexObj['count'] = data[prop];
                 flatData.push(newIndexObj);
                }
            }
            productIndexes[ indexes[i].key ] = flatData;
        });
        return productIndexes;
    }
}
