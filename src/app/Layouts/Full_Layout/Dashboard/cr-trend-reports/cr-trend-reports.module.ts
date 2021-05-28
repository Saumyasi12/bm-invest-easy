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
import { ReactiveFormsModule } from '@angular/forms';
import { SpinLoaderModule } from 'src/app/Layouts/spin-loader/spin-loader.module';
//import {WecareTrendComponent} from './wecare-casetrend/wecare-casetrend.component' 

import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { FusionChartsModule } from 'angular-fusioncharts';
import * as FusionCharts from "../../../../../../fusioncharts/js/fusioncharts";
import * as charts from "../../../../../../fusioncharts/js/fusioncharts.charts";
import {ChartService} from '../../../../Services/charts/chart.service'

FusionCharts.options.license({ key: 'fdF6tkgD3B1D8B1B2D1A1B2F2C2C11A5etE-11F3F3swB-22kB-13B2E2oyjG1C3C8D4E3D2B2C3I2D1B10B2D1F4D5D3B-8I-8G-7B6A6E3tB2C1C1ihC-21B1E6B1ycrA33A18B14isqB4A2H4C1J4A2A11C1A3C1E3vxxC5B7CE2C-11xoH1F2C2fuC7d1D4G4ccC-22C6D4B5D1D1D1D1G1B11D9C1B5D5B2j==', creditLabel: false }); 
FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme);
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
    ReactiveFormsModule,
    FusionChartsModule,
    SpinLoaderModule
  ],
  providers:[
    ChartService
  ]
})


export class CrTrendsReportModule { }
