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
import { SpinLoaderModule } from 'src/app/Layouts/spin-loader/spin-loader.module';
import { HttpClientModule } from '@angular/common/http';
import { CrNumberComponent } from './cr-number.component';
import { CrNumberService } from 'src/app/Services/cr-number.service';

const route: Routes = [{
  path: '', component:CrNumberComponent 
  /* , children: [
    {
      path: '', component:ReactiveCaseComponent 
    },
  ] */
}]

@NgModule({
  declarations: [CrNumberComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    HttpClientModule,
    GridModule, 
    SpinLoaderModule,   
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
    FormsModule
  ],
  providers:[
    CrNumberService
  ]
})
export class CrNumberModule { }
