import {Actions, createEffect, ofType} from '@ngrx/effects';

import * as LoginActions from './login.actions';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {LoginService} from '../core/services/login.service';
import {environment} from '../../environments/environment';
import {of} from 'rxjs';

const handleAuthentication = (id: string) => {
  return LoginActions.loginSuccess({id})
}

const handleError = (errorRes: any) => {
  let errorMessage = 'Something went wrong...'

  return of(LoginActions.loginFail({errorMessage}))
};

@Injectable()
export class LoginEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private loginService: LoginService,
  ) {
  }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.loginStart),
      switchMap(action => {
        console.log('here')
        return this.http.post<string>(environment.api_url + '/users',
          {username: action.username, password: action.password}, {})
          .pipe(
            tap(resData => {console.log(resData)}),
            map(resData => {
              return handleAuthentication(resData)
            }),
            catchError(errRes => {
              console.log(errRes);
              return handleError(errRes)
            })
        )
      })
    )
  )

  loginRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.loginSuccess),
      tap(action => {
        console.log('redirect')
        this.router.navigate(['/'])
      })
    ), { dispatch: false }
  );

  authLogout$ = createEffect(() =>
      this.actions$.pipe(
        ofType(LoginActions.logout),
        tap(() => {
          localStorage.removeItem('userId')
          this.router.navigate(['/login'])
        })
      ), {dispatch: false}
  )
}
