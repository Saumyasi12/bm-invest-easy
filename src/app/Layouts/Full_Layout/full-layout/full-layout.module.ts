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
import { AuthGuardService } from 'src/app/Services/guards/auth-guard.service';
import { RoleGuardService } from 'src/app/Services/guards/role-guard.service';
//import { CreditCardMaskModule } from '../pipes/credit-card-mask.module';

const routes: Routes = [{
  path: '', component: FullLayoutComponent,canActivate:[AuthGuardService],
  children: [
    {
      path: '',
      redirectTo: '/casestat',
      pathMatch: 'full'
    },

    {
      path: 'casestat',
      loadChildren: () => import('../Dashboard/case-stat/case-stat.module').then(m => m.CaseStatModule),
      data:{url:"casestat"},
      canActivate:[RoleGuardService]
    },
    {
      path: 'crnumber',
      loadChildren: () => import('../Dashboard/cr-number/cr-number.module').then(m => m.CrNumberModule) ,
      data:{url:"crnumber"},
      canActivate:[RoleGuardService]
    },
    {
      path: 'expnumber',
      loadChildren: () => import('../Dashboard/expired-crdata/expired-crdata.module').then(m => m.ExpiredCrdataModule),
      data:{url:"expnumber"},
      canActivate:[RoleGuardService]
    },
    {
      path: 'exception',
      loadChildren: () => import('../Dashboard/exception-data/exception-data.module').then(m => m.ExceptionDataModule),
      data:{url:"exception"},
      canActivate:[RoleGuardService]
    },
    {
      path: 'countrycode',
      loadChildren: () => import('../Dashboard/country-code/country-code.module').then(m => m.CountryCodeModule),
      data:{url:"countrycode"},
      canActivate:[RoleGuardService]
    },
    {
      path: 'configcode',
      loadChildren: () => import('../Dashboard/config-code/config-code.module').then(m => m.ConfigCodeModule),
      data:{url:"configcode"},
      canActivate:[RoleGuardService]
    },
    {
      path: 'legaltype',
      loadChildren: () => import('../Dashboard/legal-type/legal-type.module').then(m => m.LegalTypeModule),
      data:{url:"legaltype"},
      canActivate:[RoleGuardService]
    },
    {
      path: 'crtrendsreport',
      loadChildren: () => import('../Dashboard/cr-trend-reports/cr-trend-reports.module').then(m => m.CrTrendsReportModule),
      data:{url:"crtrendsreport"},
      canActivate:[RoleGuardService]
    }
    , {
      path: 'usermanagement',
      loadChildren: () => import('../Dashboard/user-management/user-management.module').then(m => m.UserManagementModule),
      data:{url:"usermanagement"},
      canActivate:[RoleGuardService]
    }    ,
    {
      path: 'errorpage',
      loadChildren: () => import('../Dashboard/error-page/error-page.module').then(m => m.ErrorPageModule)
    }
  ]
}];



@NgModule({

  imports: [
    CommonModule,
    LayoutModule,
    NavigationModule,
    IconsModule,
    RouterModule.forChild(routes),
    IntlModule,
    ButtonsModule
  ],
  declarations: [FullLayoutComponent, HeaderComponent,
  ],
})
export class FullLayoutModule { }
