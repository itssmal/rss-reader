import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LoginService} from '../services/login.service';
import {Store} from '@ngrx/store';

import * as fromApp from '../../app.reducer';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private loginService: LoginService,
              private store: Store<fromApp.AppState>,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.getState()) {
      return true;
    }
    this.router.navigateByUrl('/login');
  }

  private async getState(): Promise<any> {
    return await this.store.select('login').toPromise().then(state => state.isAuthenticated)
  }
}
