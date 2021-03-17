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
import { LegalTypeComponent } from './legal-type.component';
import { LegalTypeService } from 'src/app/Services/legal-type.service';
import { SpinLoaderModule } from 'src/app/Layouts/spin-loader/spin-loader.module';
import { LegalTypeAddEditComponent } from './legal-type-add-edit/legal-type-add-edit.component';
const route: Routes = [{
  path: '', component:LegalTypeComponent 
  /* , children: [
    {
      path: '', component:ReactiveCaseComponent 
    },
  ] */
}]

@NgModule({
  declarations: [LegalTypeComponent, LegalTypeAddEditComponent],
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
    LegalTypeService
  ]
})
export class LegalTypeModule { }
