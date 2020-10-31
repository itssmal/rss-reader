import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public isAuthenticated = false
  public userId
  public users

  constructor() { }

  public attemptLogout() {

  }

 }
