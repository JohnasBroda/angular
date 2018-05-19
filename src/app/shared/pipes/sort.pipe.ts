import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(array: string[], order: 'ASC' | 'DSC'): any {

    if (!order) {
      return array;
    }

    return order === 'ASC' ? array.sort() : array.sort().reverse();
  }
}
