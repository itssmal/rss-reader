import {Action, createReducer, on} from '@ngrx/store';

import * as LoginActions from './login.actions';

export interface State {
  isAuthenticated: boolean;
  isLoading: boolean;
  authError: string;
}

const initialState: State = {
  isAuthenticated: false,
  isLoading: false,
  authError: null,
}

const _loginReducer = createReducer(
  initialState,

  on(
    // actions
    LoginActions.loginStart,
    (state) => ({
      ...state,
      authError: null,
      isLoading: true,
    })
  ),

  on(
    LoginActions.loginSuccess,
    (state, action) => ({
      ...state,
      authError: null,
      isLoading: false,
      isAuthenticated: true,
    }),
  ),

  on(
    LoginActions.loginFail,
    (state, action) => ({
      ...state,
      authError: action.errorMessage,
      isLoading: false,
      isAuthenticated: false,
    })
  ),

  on(
    LoginActions.logout,
    (state) => ({
      ...state,
      authError: null,
      isLoading: false,
      isAuthenticated: false,
    })
  )
);

export function loginReducer(state: State, action: Action) {
  return _loginReducer(state, action);
}
