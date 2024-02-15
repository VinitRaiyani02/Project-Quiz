import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class BaseInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService, private router: Router,private _snackbar: MatSnackBar) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    this.tokenService.setToken();
    const jwt = this.tokenService.jwtToken;
    const reqCopy = request.clone({ setHeaders: { authorization: `Bearer ${jwt}` } });
    return next.handle(reqCopy).pipe(
      tap({
        next: (event) => {
          if (this.tokenService.isTokenExpired()) {
            this._snackbar.open("please login again", "ok", {
              duration: 1500,
              verticalPosition: "top",
              horizontalPosition: "right"
            })
            this.router.navigate([""]);
            return EMPTY;
          }
          if (event instanceof HttpResponse) {
            if (event.status == 401) {
              alert('Unauthorized access!')
            }
          }
          return event;
        },
        error: (error) => {
          if (this.tokenService.isTokenExpired()) {
            this._snackbar.open("please login again", "ok", {
              duration: 1500,
              verticalPosition: "top",
              horizontalPosition: "right"
            })
            this.router.navigate([""]);
          }
          if (error.status === 401) {
            alert('Unauthorized access!')
            this.router.navigate([""]);
          }
          else if(error.status === 403){
            alert('you are not authorized for this page');
          }
        }
      }));;
  }
}
