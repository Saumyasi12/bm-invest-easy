import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridModule, PDFModule, ExcelModule } from '@progress/kendo-angular-grid';
import { IconsModule } from '@progress/kendo-angular-icons';
import { InputsModule } from '@progress/kendo-angular-inputs';
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
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'


import { HttpClientModule } from '@angular/common/http';
import { ConfigCodeComponent } from './config-code.component';
import { ConfigCodeService } from 'src/app/Services/config-code.service';
import { SpinLoaderModule } from 'src/app/Layouts/spin-loader/spin-loader.module';
import { ConfigAddEditComponent } from './config-add-edit/config-add-edit.component';
const route: Routes = [{
  path: '', component:ConfigCodeComponent 
  /* , children: [
    {
      path: '', component:ReactiveCaseComponent 
    },
  ] */
}]

@NgModule({
  declarations: [ConfigCodeComponent, ConfigAddEditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    HttpClientModule,
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
    ReactiveFormsModule,
    FormsModule,
    SpinLoaderModule
  ],
  providers:[
    ConfigCodeService
  ]
})
export class ConfigCodeModule { }
