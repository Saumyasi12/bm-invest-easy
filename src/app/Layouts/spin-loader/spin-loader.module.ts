import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinLoaderComponent } from './spin-loader.component';



@NgModule({
  declarations: [SpinLoaderComponent],
  imports: [
    CommonModule
  ],
  exports:[SpinLoaderComponent]
})
export class SpinLoaderModule { }
