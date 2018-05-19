import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { Injectable } from '@angular/core';
import { Observer } from 'firebase/app';

@Injectable()
export class ScrollSvc {
    constructor() {}

    watchScrollPosition() {
        return Observable.fromEvent(window, 'scroll');
    }
}
