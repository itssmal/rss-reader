import {createAction, props} from '@ngrx/store';

export const loginStart = createAction(
  '[Auth] Login Start',
  props<{
    username: string,
    password: string,
  }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{
    id: string
  }>()
);

export const loginFail = createAction(
  '[Auth] Login Fail',
  props<{
    errorMessage: string
  }>()
);

export const logout = createAction(
  '[Auth] Logout'
);
