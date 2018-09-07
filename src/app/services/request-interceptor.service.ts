import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { catchError, switchMap, finalize, filter, take } from 'rxjs/operators';

@Injectable()
export class RequestInterceptorService implements HttpInterceptor{
  
  isRefreshingToken: boolean = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private authService: AuthService) {}

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ setHeaders: { Authorization: token }})
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    return next.handle(this.addToken(req, this.authService.getCurrentToken())).pipe(catchError((error, caught) => {
      if (error instanceof HttpErrorResponse) {
        switch ((<HttpErrorResponse>error).status) {
            case 400:
              // CHECK IT OUT
              return this.handle401Error(req, next);
            case 401:
              return this.handle401Error(req, next);
        }
      } else {
          return Observable.throw(error);
      }
    }) as any)
  }
  
  handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
        this.isRefreshingToken = true;

        // Reset here so that the following requests wait until the token
        // comes back from the refreshToken call.
        this.tokenSubject.next(null);

        return this.authService.renewToken().pipe(switchMap((tokens: Object) => { 
          if (tokens) {
              this.tokenSubject.next(tokens['token']);
              this.authService.setTokens(tokens)
              return next.handle(this.addToken(req, tokens['token']));
          }
 
          // If we don't get a new token, we are in trouble so logout.
          return this.logoutUser();
        }), catchError((error, caught) => {
          return this.logoutUser();
        }), finalize( () => {
          this.isRefreshingToken = false;
        }) );
    } else {
        return this.tokenSubject.pipe(filter(token => token != null), take(1), switchMap(token => {
          return next.handle(this.addToken(req, token));
        }));
    }
}

  logoutUser() {
    // Route to the login page (implementation up to you)

    return Observable.throw("");
  }
}
