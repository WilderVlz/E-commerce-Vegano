import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '@shared/interfaces/user.interface';
import { AuthStatus } from '@shared/enums/auth-status.enum';
import { LoginResponse } from '@shared/interfaces/login-response.interface';
import { ApiBaseService } from './api-base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _apiBase = inject( ApiBaseService );

  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>( AuthStatus.checking );

  //! Al mundo exterior
  public currentUser = computed( () => this._currentUser() );
  public authStatus = computed( () => this._authStatus() );

  constructor() {
    console.log("accessToken =>", this._authStatus)
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication(accessToken:string | undefined): boolean {

    console.log("accessToken =>", accessToken)

    //this._currentUser.set( user );
    this._authStatus.set( AuthStatus.authenticated );

    if(accessToken){
      localStorage.setItem('token', accessToken);
      //this._apiBase.addAuthorization(accessToken);
    }


    return true;
  }



  login(body: object): Observable<any> {
    /*
    return this.http.post(BASE_URL_SECURITY + '/authenticate', body, {observe: 'response'})
      .pipe(map(res => {
        //console.log("HttpResponse  =>", res)

        //console.log("headers =>" + JSON.stringify(res));

        const token = res.headers.get("authorization") || "";

        //console.log("authorization =>", token);

        //return res;

        return token;
      }));
      */
     //return this.http.post(BASE_URL_SECURITY + '/authenticate', body, this.httpOptions);

    return this._apiBase.post<LoginResponse>('/auth/authenticate', body )
      .pipe(
        map( ({ accessToken }) => {
            return this.setAuthentication( accessToken )
          }
        ),
        catchError( err => throwError( () =>
        {
          return err.error.message;
        } ))
      );
  }

  checkAuthStatus():Observable<boolean> {

    const token = localStorage.getItem('token');

    if ( !token ) {
      this.logout();
      return of(false);
    }


    return this._apiBase.post<LoginResponse>('/auth/refresh-token', {})
      .pipe(
        map( ({ codeStatus, message, refreshToken }) => {
          console.log("refreshToken 1=>", codeStatus)

          if(codeStatus >= 300){
            throw new Error(message);
          }
          return this.setAuthentication( refreshToken )
        }),
        catchError((error) => {
          console.log("error =>", error)
          this._authStatus.set( AuthStatus.notAuthenticated );
          return of(false);
        })
      );


  }

  registro(body: object): Observable<any> {
    return this._apiBase.post<LoginResponse>('/auth/register', body );
  }

  logout() {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set( AuthStatus.notAuthenticated );

  }

}
