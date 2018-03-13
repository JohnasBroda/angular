import { PaginatorEvent } from './paginatorEvent';
import { PipeTransform, Pipe } from '@angular/core';
import { Product } from './Product';
import { SortMode } from './sort-mode';

@Pipe({ name: 'paginator' })
export class PaginatorPipe implements PipeTransform {

    transform(products: Product[], event: PaginatorEvent): Product[] {
        console.log(products);
        const from = event.page * event.rows;
        const to = from + event.rows;
        console.log(products.filter((product, index) => index >= from && index < to));
        return products.filter((product, index) => index >= from && index < to);
    }
}
