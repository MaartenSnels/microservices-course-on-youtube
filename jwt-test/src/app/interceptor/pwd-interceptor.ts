import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class PwdInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      const auth = `Bearer ${token.trim()}`;
      req = req.clone({
        setHeaders: {
          Authorization: auth,
        }
      });
    }
    return next.handle(req);
  }
}
