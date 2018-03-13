import { PipeTransform, Pipe } from '@angular/core';
import { Product } from './Product';
import { SortMode } from './sort-mode';

@Pipe({ name: 'orderBy' })
export class OrderByPipe implements PipeTransform {
    transform(products: Product[], sortMode: SortMode): Product[] {
        const sorted = products.sort((a: Product, b: Product) => {
            if (a[sortMode.property] < b[sortMode.property]) {
                return -1;
            } else if (a[sortMode.property] > b[sortMode.property]) {
                return 1;
            } else {
                return 0;
            }
        });
        console.log(sorted);
        return sortMode.order === 'ASC' ? sorted : sorted.reverse();
    }
}
