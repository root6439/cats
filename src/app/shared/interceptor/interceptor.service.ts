import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (localStorage.getItem('auth')) {
      const headers = new HttpHeaders({
        Authorization: localStorage.getItem('auth'),
        'Content-Type': 'application/json',
      });
      const cloneReq = req.clone({ headers });

      return next.handle(cloneReq);
    }

    return next.handle(req);
  }
}
