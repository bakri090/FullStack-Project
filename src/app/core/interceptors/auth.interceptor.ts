import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if(token){
      let header = new HttpHeaders();
      request = request.clone({
        setHeaders:{
          Aithorization:`Bearer ${token}`
        }
      });
    }
    return next.handle(request).pipe(
      catchError((err:HttpErrorResponse) => {
        if(err.status == 401){
          console.warn('Unauthorized - Token missing or expired');
      } return throwError(() => err)
    })
    )
  }
}
