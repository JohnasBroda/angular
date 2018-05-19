import { Observable } from 'rxjs/Observable';
import { Pipe, PipeTransform } from '@angular/core';
import { IProductsState, selectProductState, Product } from '@store/product';
import { Store } from '@ngrx/store';
import { IAppState } from '@store/app.states';
import { PageEvent } from '@angular/material';

@Pipe({ name: 'paginator' })
export class PaginatorPipe implements PipeTransform {

    private productState: Observable<IProductsState>;

    constructor(private store: Store<IAppState>) {
        this.productState = this.store.select(selectProductState);
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
