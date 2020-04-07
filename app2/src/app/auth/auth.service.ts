import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs/';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface AuthResponseData{
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  apiToken  = environment.apiKey;
  baseUrl   = 'https://identitytoolkit.googleapis.com/v1/accounts:';

  signUpUrl = `${this.baseUrl}signUp?key=${this.apiToken}`;
  signInUrl = `${this.baseUrl}signInWithPassword?key=${this.apiToken}`;

  user = new BehaviorSubject<User>(null);

  private tokenExpTimer: any;
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpTimer){
      clearTimeout(this.tokenExpTimer);
    }
  }

  autoLogout(expDuration: number){
    this.tokenExpTimer = setTimeout(() => {
      this.logout();
    },expDuration)
  }

  signup(email: string, password: string){
    return this.http
      .post<AuthResponseData>(this.signUpUrl, {
        email, password, 
        returnSecureToken: true
      })
      .pipe(
        catchError( this.handleError),
        tap(resData => {
          this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
        })
      );
  }

  login(email: string, password: string){

    return this.http
      .post<AuthResponseData>(this.signInUrl, {
        email, password, 
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleError), 
        tap(resData => {
          this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
        })
      )
  }

  autoLogin(){
    const userData = JSON.parse(localStorage.getItem('userData'));
    if(!userData) return;

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    )
    
    if(loadedUser.token){
      this.user.next(loadedUser);
      const expDuration = new Date(userData._tokenExpiration).getTime() - new Date().getTime();
      this.autoLogout(expDuration);
    }

  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number){
    const expiresDate = new Date( new Date().getTime() + expiresIn * 1000 );
    const user = new User( 
      email, 
      userId, 
      token, 
      expiresDate
    );
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = 'Unknown error oqured!';
    if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage);
    }
    switch(errorRes.error.error.message){
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
      break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist';     
      break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct';  
    }
    return throwError(errorMessage);    
  }
}
