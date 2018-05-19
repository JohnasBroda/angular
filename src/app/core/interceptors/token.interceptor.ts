import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '@environments/environment';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '@services/auth/auth.service';

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
