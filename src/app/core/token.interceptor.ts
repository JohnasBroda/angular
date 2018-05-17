import { environment } from "./../../environments/environment.prod";
import { Injectable, Injector } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs/Observable";
import { switchMap } from "rxjs/operators";

import * as firebase from "firebase/app";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private inj: Injector, private auth: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // transform req if targeting own api
    if (request.url.indexOf(environment.functionsURL.api) > -1) {
      return this.auth.getUserIdToken().pipe(
        switchMap(token => {
          if (token) {
            request = request.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`
              }
            });
            console.log(request);
            return next.handle(request);
          } else {
            return Observable.throw(`Couldn't authenticate request. Please sign In first!`);
          }
        })
      );
    }

    // let req throught unmodified otherwise
    return next.handle(request);
  }
}
