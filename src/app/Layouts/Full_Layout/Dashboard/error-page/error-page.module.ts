import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {ErrorPageComponent} from './error-page.component'

import { LayoutModule } from '@progress/kendo-angular-layout';

const route: Routes = [{
  path: '', component: ErrorPageComponent, children: [
    {
      path: '', component: ErrorPageComponent
    },
  ]
}]


@NgModule({
  declarations: [ErrorPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    LayoutModule
  ]
})
export class ErrorPageModule { }
