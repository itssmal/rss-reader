import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {LoginGuard} from './core/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    loadChildren: () => import('./layout/layout.module').then(m=>m.LayoutModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'login',
    loadChildren: ()=>import('./login/login.module').then(m=>m.LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
