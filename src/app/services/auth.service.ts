import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private refreshToken: string = 'stale_auth_token';
  private currentToken: string;
  private userId: string;
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  messagesUrl = 'https://shakti-ma.herokuapp.com/';
  
  constructor( private http: HttpClient ) {
    this.refreshToken = localStorage.getItem('refreshToken');
    this.currentToken = localStorage.getItem('currentToken');
    this.userId = localStorage.getItem('userId');
  }

  renewToken(): Observable<Object> {
      return this.http.post<Object>(this.messagesUrl + "token", {refreshToken: this.refreshToken, userId: this.userId});
  }
  
  setTokens(tokens): void {
    this.refreshToken = tokens.refreshToken;
    localStorage.setItem('refreshToken', this.refreshToken);
    this.currentToken = tokens.token;
    localStorage.setItem('currentToken', this.currentToken)
  }
  
  setUserId(userId): void {
    this.userId = userId;
    localStorage.set('userId', userId);
  }
  
  getCurrentToken(): string {
    return this.currentToken;
  }
  
  logOut(): void {
    this.userId = null;
    this.refreshToken = null;
    this.currentToken = null;
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentToken');
    localStorage.removeItem('userId');
  }
  
  logIn(email: string, password: string): Observable<Object> {
    return this.http.post<Object>(this.messagesUrl + 'login', {email: email, password: password});
  }
}



