import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullLayoutComponent } from '../full-layout/full-layout.component';
import { RouterModule, Routes } from '@angular/router';



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

import { HeaderComponent } from '../header/header.component';
//import { CreditCardMaskModule } from '../pipes/credit-card-mask.module';

const routes: Routes = [{
  path: '', component: FullLayoutComponent,
  children: [
    {
      path: '',
      redirectTo: '/reactivecase',
      pathMatch: 'full'
    } ,
    {
      path: 'reactivecase',
      loadChildren: () => import('../Dashboard/reactive-cases/reactive-cases.module').then(m => m.ReactiveCasesModule)
    },
    {
      path: 'casestat',
      loadChildren: () => import('../Dashboard/case-stat/case-stat.module').then(m => m.CaseStatModule)
    } ,
    {
        path: 'crnumber',
        loadChildren: () => import('../Dashboard/cr-number/cr-number.module').then(m => m.CrNumberModule)
      },
      {
        path: 'expnumber',
        loadChildren: () => import('../Dashboard/expired-crdata/expired-crdata.module').then(m => m.ExpiredCrdataModule)
      },
      {
        path: 'exception',
        loadChildren: () => import('../Dashboard/exception-data/exception-data.module').then(m => m.ExceptionDataModule)
      },
      {
        path: 'countrycode',
        loadChildren: () => import('../Dashboard/country-code/country-code.module').then(m => m.CountryCodeModule)
      },
      {
        path: 'configcode',
        loadChildren: () => import('../Dashboard/config-code/config-code.module').then(m => m.ConfigCodeModule)
      },
      {
        path: 'legaltype',
        loadChildren: () => import('../Dashboard/legal-type/legal-type.module').then(m => m.LegalTypeModule)
      },
    /*{
      path: 'v_summary',
      loadChildren: () => import('../Dashboard/visa-summary-sheet/visa-summary-sheet.module').then(m => m.VisaSummarySheetModule)
    } ,
    {
      path: 'casehistory',
      loadChildren: () => import('../Dashboard/case-histtory/case-histtory.module').then(m => m.CaseHisttoryModule)
    } ,
    {
      path: 'closurereport',
      loadChildren: () => import('../Dashboard/closer-report/closer-report.module').then(m => m.CloserReportModule)
    } ,
    {
      path: 'macthedtran',
      loadChildren: () => import('../Dashboard/matched-transaction/matched-transaction.module').then(m => m.MatchedTransactionModule)
    } ,
    {
      path: 'unmacthedtran',
      loadChildren: () => import('../Dashboard/unmatched-transaction/unmatched-transaction.module').then(m => m.UnmatchedTransactionModule)
    } ,
    {
      path: 'reconciliation',
      loadChildren: () => import('../Dashboard/reconciliation/reconciliation.module').then(m => m.ReconciliationModule)
    } ,
   
     */
  
   /* {
      path: 'wcstat',
      loadChildren: () => import('../Dashboard/wecare-statistics/wecare-statistics.module').then(m => m.WecareStatisticsModule)
    } 
    ,
    {
      path: 'wccasetrend',
      loadChildren: () => import('../Dashboard/weCare-case-trends/we-care-case-trends.module').then(m => m.WeCareCaseTrendsModule)
    } , */
   /*  {
      path: 'wccasereport',
      loadChildren: () => import('../Dashboard/wecare-case-report/wecare-case-report.module').then(m => m.WecareCaseReportModule)
    } , */
   /*  {
      path: 'monthlycaseregistered',
      loadChildren: () => import('../Dashboard/monthly-case-registered/monthly-case-registered.module').then(m => m.MonthlyCaseRegisteredModule)
    } , */
    /* {
      path: 'staffperformance',
      loadChildren: () => import('../Dashboard/staff-performance/staff-performance.module').then(m => m.StaffPerformanceModule)
    } , */
    
   /*  {
      path: 'slastat',
      loadChildren: () => import('../Dashboard/slastat/slastat.module').then(m => m.SlastatModule)
    }, */
    /* {
      path: 'beyondsla',
      loadChildren: () => import('../Dashboard/beyond-sla-cases/beyond-sla-cases.module').then(m => m.BeyondSlaCasesModule)
    }     , */
    /* {
      path: 'misonsla',
      loadChildren: () => import('../Dashboard/mis-on-sla-days/mis-on-sla-days.module').then(m => m.MisOnSlaDaysModule)
    } , 
   
   
   
    {
      path: 'usermanagement',
      loadChildren: () => import('../Dashboard/user-management/user-management.module').then(m => m.UserManagementModule)
    } 
    ,
    {
      path: 'errorpage',
      loadChildren: () => import('../Dashboard/error-page/error-page.module').then(m => m.ErrorPageModule)
    } */ 
  ]
}];



@NgModule({
 
  imports: [
    CommonModule,
    LayoutModule,
    NavigationModule,
    IconsModule,
    RouterModule.forChild(routes),
    // GridModule,
    
    // InputsModule,
   
    // LabelModule,
    // DateInputsModule,
    IntlModule,
    ButtonsModule,
    // ExcelExportModule,
    // ExcelModule,
    // PDFModule,

    // TooltipModule,
    // DialogsModule,
    // DropDownsModule,
    //CreditCardMaskModule
  ],
  declarations: [FullLayoutComponent,HeaderComponent,    
  ],
})
export class FullLayoutModule { }
