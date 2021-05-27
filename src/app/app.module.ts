

import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'
//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UploadModule } from '@progress/kendo-angular-upload';
import { AppConfig } from './Services/app-config.service';


function initConfig(config: AppConfig){
  return () => config.ensureInit();
}

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
    AppConfig,
    { provide: APP_INITIALIZER, useFactory: initConfig, deps: [AppConfig], multi: true }, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
