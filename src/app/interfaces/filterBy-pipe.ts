import { PaginatorEvent } from './paginatorEvent';
import { PipeTransform, Pipe } from '@angular/core';
import { Product } from './Product';
import { SortMode } from './sort-mode';

@Pipe({ name: 'filterBy' })
export class FilterByPipe implements PipeTransform {
    transform(products: Product[], searchInput: string): Product[] {
        return searchInput.length ?
        products.filter((product: Product) => Object.values(product).indexOf(searchInput) > -1) : products;
    }
}
