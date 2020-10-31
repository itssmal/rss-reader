import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';

import * as fromApp from '../../app.reducer'
import * as loginActions from '../../login/login.actions'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
  }

  public logout():void {
    this.store.dispatch(loginActions.logout())
  }
}
