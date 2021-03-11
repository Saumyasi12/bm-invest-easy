import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SimplelLayoutComponent } from '../simplel-layout/simplel-layout.component'
import {LoginPageComponent} from '../login-page/login-page.component'

import { IconsModule } from '@progress/kendo-angular-icons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { IntlModule } from '@progress/kendo-angular-intl';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { LayoutModule } from '@progress/kendo-angular-layout';

import { ReactiveFormsModule } from '@angular/forms'


const routes: Routes = [{
  path: '' , component: SimplelLayoutComponent,
   children: [
     {
      path: '', component: SimplelLayoutComponent
     }
  ]
}];
@NgModule({
  declarations: [SimplelLayoutComponent,LoginPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),  
    ReactiveFormsModule,
    InputsModule,
    IconsModule,
    LabelModule,    
    DateInputsModule,
    IntlModule,
    ButtonsModule,
    ExcelExportModule,  
    LayoutModule,
    NotificationModule
  
  ]
})
export class SimpleLayoutModule { }
