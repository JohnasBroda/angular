import { IAppState } from './../app.states';
import { PageEvent } from '@angular/material';
import { PipeTransform, Pipe } from '@angular/core';
import { SortMode } from './sort-mode';
import { Product, IProductsState } from '@store/products';
import { Store } from '@ngrx/store';
import * as fromproducts from '@store/products/index';
import { Observable } from 'rxjs/Observable';
@Pipe({ name: 'paginator' })
export class PaginatorPipe implements PipeTransform {

    private productState: Observable<IProductsState>;

    constructor(private store: Store<IAppState>) {
        this.productState = this.store.select(fromproducts.selectProductState);
    }

    transform(array: any[], event: PageEvent): Product[] {
        // console.log(array);
        // console.log(event);

        // pass the array throught unmodified when infinite scroll is used!
        if (!event) { return array; }

        if (event) {
            const from = event.pageIndex * event.pageSize;
            const to = from + event.pageSize;
            // console.log(array.filter((product, index) => index >= from && index < to));
            return array.filter((product, index) => index >= from && index < to);
        }
        return array;
    }
}
