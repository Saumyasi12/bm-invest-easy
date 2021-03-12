import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


import { GridModule, PDFModule, ExcelModule } from '@progress/kendo-angular-grid';
import { LayoutModule } from '@progress/kendo-angular-layout';

import { IconsModule } from '@progress/kendo-angular-icons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { IntlModule } from '@progress/kendo-angular-intl';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';

import { NavigationModule } from '@progress/kendo-angular-navigation';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { CrTrendReportsComponent } from './cr-trend-reports.component';
//import {WecareTrendComponent} from './wecare-casetrend/wecare-casetrend.component' 

const newRoute: Routes=[

    {
      path: '', component: CrTrendReportsComponent, 
      children: [{
          path: '', redirectTo: 'crtrend', pathMatch: 'full'
        },
        {
          path: 'crtrend', 
          loadChildren: () => import('./cr-trends/cr-trends.module').then(m => m.CrTrendsModule)
        }
      ]
    }

]




@NgModule({
  declarations: [CrTrendReportsComponent],
  imports: [   
    CommonModule,
    RouterModule.forChild(newRoute),
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
  ]
})


export class CrTrendsReportModule { }
