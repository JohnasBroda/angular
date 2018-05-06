import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'filterBy' })
export class FilterByPipe implements PipeTransform {
    transform(array: any[], filters: {}, updateCount: number): any[] {

        if (!filters || !array) {
            return array;
        }

        const filteredArr = array.filter(val => {
            for (const filterKey in filters) {
                if (filters.hasOwnProperty(filterKey)) {
                    let filterGrp: string[] = filters[filterKey];
                    filterGrp = filterGrp.map(filter => filter.toLowerCase());
                    if ((val as {}).hasOwnProperty(filterKey)) {
                        if ((filterGrp as any[]).includes((val[filterKey] as string).toLowerCase())) {
                            continue;
                        } else {
                            return false;
                        }
                    } else {
                        continue;
                    }
                }
            }
            return true;
        });
        return filteredArr;
    }
}
