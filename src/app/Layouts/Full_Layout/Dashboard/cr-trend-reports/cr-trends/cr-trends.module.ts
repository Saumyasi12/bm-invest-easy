import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {CrTrendsComponent} from './cr-trends.component';
import {DailyCaseTrendComponent} from '../daily-case-trend/daily-case-trend.component'
import {MonthlyCaseTrendComponent} from '../monthly-case-trend/monthly-case-trend.component'
import {YearlyCaseTrendComponent} from '../yearly-case-trend/yearly-case-trend.component'
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

import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { FusionChartsModule } from 'angular-fusioncharts';
FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme);

const route: Routes = [{
    path: '', component: CrTrendsComponent, children: [
      {
        path: '', component: CrTrendsComponent
      }
    ]
  }]
  
  @NgModule({
    declarations: [CrTrendsComponent,DailyCaseTrendComponent,MonthlyCaseTrendComponent,YearlyCaseTrendComponent],
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
      FusionChartsModule
  
    ]
  })
  export class CrTrendsModule { }