import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {RouterModule} from '@angular/router';
import {NbActionsModule, NbIconModule} from '@nebular/theme';



@NgModule({
  declarations: [HeaderComponent],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NbIconModule,
    NbActionsModule
  ]
})
export class SharedModule { }
