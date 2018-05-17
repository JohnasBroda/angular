import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objProperties'
})
export class ObjPropertiesPipe implements PipeTransform {

  transform(value: {}): any[] {

    if (!value) {
      return [];
    }

    return Object.keys(value);
  }

}
