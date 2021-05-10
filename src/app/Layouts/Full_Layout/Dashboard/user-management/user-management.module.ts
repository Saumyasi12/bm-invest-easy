import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserManagementComponent} from './user-management.component'

import { GridModule, PDFModule, ExcelModule } from '@progress/kendo-angular-grid';
import { IconsModule } from '@progress/kendo-angular-icons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import {ListViewModule} from '@progress/kendo-angular-listview'
import { LabelModule } from '@progress/kendo-angular-label';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { IntlModule } from '@progress/kendo-angular-intl';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { NotificationModule } from '@progress/kendo-angular-notification';
import { RouterModule, Routes } from '@angular/router';

const route: Routes = [{
  path: '', component: UserManagementComponent, children: [
    {
      path: '', component: UserManagementComponent
    },
  ]
}]
@NgModule({
  declarations: [UserManagementComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    GridModule,    
    InputsModule,
    IconsModule,
    LabelModule,
    DateInputsModule,
    IntlModule,
    ButtonsModule,
    ExcelExportModule,
    ExcelModule,
    PDFModule,
    LayoutModule,
    NavigationModule,
    TooltipModule,
    DialogsModule,
    DropDownsModule,
    FormsModule,
    ReactiveFormsModule,
    ListViewModule,
    NotificationModule
  ]
})
export class UserManagementModule { }
