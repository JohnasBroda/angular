import { PipeTransform, Pipe } from '@angular/core';
import { SortMode } from './sort-mode';
import { Product } from '@store/products';

@Pipe({ name: 'orderBy' })
export class OrderByPipe implements PipeTransform {
    transform(array: any[], sortMode: SortMode): Product[] {

        if (!sortMode || !sortMode.order) {
            return array;
        }

        const sorted = array.sort((a: Product, b: Product) => {
            if (a[sortMode.property] < b[sortMode.property]) {
                return -1;
            } else if (a[sortMode.property] > b[sortMode.property]) {
                return 1;
            } else {
                return 0;
            }
        });

        return sortMode.order === 'ASC' ? sorted : sorted.reverse();
    }
}
