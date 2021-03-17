import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CaseStatComponent} from './case-stat.component'
import { RouterModule, Routes } from '@angular/router';

import {RoutingPortalStatisticsComponent} from '../case-stat/routing-portal-statistics/routing-portal-statistics.component'

import {CaseStatisticsComponent} from '../case-stat/case-statistics/case-statistics.component'

import { GridModule, PDFModule, ExcelModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

import {ChartService} from '../../../../Services/charts/chart.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinLoaderModule } from 'src/app/Layouts/spin-loader/spin-loader.module';
FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme);


const route: Routes = [{
  path: '', component: CaseStatComponent, children: [
    {
      path: '', component: CaseStatComponent
    },
  ]
}]
@NgModule({
  declarations: [CaseStatComponent,CaseStatisticsComponent,
    RoutingPortalStatisticsComponent],

   
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
    FusionChartsModule,
    ReactiveFormsModule,
    SpinLoaderModule
   
  ],
  providers:[
    ChartService
  ]
})
export class CaseStatModule { }
