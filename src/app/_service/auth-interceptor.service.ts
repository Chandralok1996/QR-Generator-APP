import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private _cookie: CookieService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenData = this._cookie.get('token');
    if(tokenData) {
      const token = req.clone({ headers: req.headers.set('Authorization', `Bearer ${tokenData}`) });
      return next.handle(token);
    } else{
      const token = req.clone();
      return next.handle(token);
    }

  }
}