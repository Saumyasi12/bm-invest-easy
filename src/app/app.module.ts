

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'
//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UploadModule } from '@progress/kendo-angular-upload';
import { CrNumberComponent } from './Layouts/Full_Layout/Dashboard/cr-number/cr-number.component';
import { ExpiredCrdataComponent } from './Layouts/Full_Layout/Dashboard/expired-crdata/expired-crdata.component';
import { ExceptionDataComponent } from './Layouts/Full_Layout/Dashboard/exception-data/exception-data.component';
import { CountryCodeComponent } from './Layouts/Full_Layout/Dashboard/country-code/country-code.component';

import { LegalTypeComponent } from './Layouts/Full_Layout/Dashboard/legal-type/legal-type.component';
import { ConfigCodeComponent } from './Layouts/Full_Layout/Dashboard/config-code/config-code.component';






const routes: Routes = [
  {
  path: '', redirectTo: '/account', pathMatch: 'full'
  },
   {
    path: 'account',
    loadChildren: () => import('./Layouts/Simple_Layout/simplel-layout/simple-layout.module').then(m => m.SimpleLayoutModule)
  },
   {
     path: '',
     loadChildren: () => import('./Layouts/Full_Layout/full-layout/full-layout.module').then(m => m.FullLayoutModule)
   }
];


@NgModule({
  declarations: [
    AppComponent
   
  ],
  imports: [
    BrowserModule,
    FormsModule,   
    RouterModule.forRoot(routes,{useHash:true}),    
    BrowserAnimationsModule,
    HttpClientModule,
    UploadModule,
  ],
  providers: [
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
