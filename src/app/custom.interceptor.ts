import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

const LS_KEY: string = 'loggedUser';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let localToken = localStorage[LS_KEY];
    if (localToken) {
      let token = JSON.parse(localToken).token;
      console.log(
        '🚀 ~ file: custom.interceptor.ts:21 ~ CustomInterceptor ~ token',
        token
      );
      request = request.clone({
        headers: request.headers.set('Authorization', 'bearer ' + token),
      });
    }

    return next.handle(request);
  }
}
