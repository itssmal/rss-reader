import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutComponent} from './layout.component';
import {LayoutRoutingModule} from './layout-routing.module';
import {NbActionsModule, NbIconModule, NbLayoutModule} from '@nebular/theme';
import {SharedModule} from '../shared/shared.module';



@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    NbLayoutModule,
    SharedModule,
    NbIconModule,
    NbActionsModule
  ]
})
export class LayoutModule { }
