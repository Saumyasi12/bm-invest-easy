import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { SortDescriptor,orderBy } from '@progress/kendo-data-query';
import { DialogService, DialogRef, DialogCloseResult } from '@progress/kendo-angular-dialog';
import { ReactiveDataModel } from 'src/app/Models/reactive-data.model';
import { ReactiveCasesService } from 'src/app/Services/reactive-cases.services';
import { headerStyle } from '../../../../common/common.functions'
//import {reactivedata} from './reactiveCase';

@Component({
  selector: 'app-reactive-case',
  templateUrl: './reactive-cases.component.html',
  styleUrls: ['./reactive-cases.component.css']
})
export class ReactiveCaseComponent implements OnInit {
  public pagename :  string = 'Reactive Case';
  
  windowHeight: number;
  @HostListener('window:resize', ['$event']) onResize(event) { 
    
    this.windowHeight = window.innerHeight-155;
    this.pageSize  = Math.ceil( this.windowHeight /35);
  }
  //----Page Loader--//
  showLoading =true;
  /// Form Reset
  allowSearch = false;
  fromDate = null;
  toDate = null;
  feedbackIdInput = null;
  caseStatus = null;
  /// Form Reset

  //error-handling
  errorMessage = null;
  errorCode = null;
  //error-handling


  pageSizeCount: number;
  public gridView!: GridDataResult;
  public pageSize = 12;
  public skip = 0;
  headerStyle=  headerStyle;
  private data!: Object[]; 
  reactiveform: FormGroup;
  public gtservice;

  reactiveData:ReactiveDataModel[]= [];

//Excel button work

public fields: string[] = [];

  constructor(private fb: FormBuilder, private dialogService: DialogService, private reactiveCasesService: ReactiveCasesService) {
  }

  ngOnInit(): void {
  this.windowHeight = window.innerHeight-155;
  this.pageSize  = Math.ceil( this.windowHeight /35);
  this.showLoading= true;
  this.generateForm();
  this.reactiveCasesService.fetchReactiveCasesData().subscribe(data=>{
    this.reactiveData= data;
    this.loadItems();
    this.showLoading= false;
  }, err=>{
    this.errorMessage=err.error.error;
    this.errorCode = err.status;
    this.showLoading= false;
  })

  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }
  private loadItems(): void {
    
    if(this.reactiveData){
      this.gridView = {
        data: this.reactiveData.slice(this.skip, this.skip + this.pageSize),     
        total: this.reactiveData.length
      };
    
    }
  }
  private loadSortedItems(): void {
    this.gridView = {
      data: orderBy(this.reactiveData, this.sort),
      total: this.reactiveData.length
    };  }
  public sort: SortDescriptor[] = [
    {
        field: 'ROLCaseNo',
        dir: 'asc'
    }
];
  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadSortedItems();
}

  generateForm(){
    this.reactiveform = this.fb.group({
      fromDate: new FormControl(),
      toDate: new FormControl(),
      feedbackId: new FormControl(),
      caseStatus: new FormControl()
    });
  }
/// form-validation //
fromDateChange(value: Date) : void{
  if(value){
    this.fromDate = value;
    this.checkFormValidation();
    }
}
toDateChange(value: Date) : void{
  if(value){
    this.toDate = value;
    this.checkFormValidation();
    }
}
feedbabackIdChange(value: string) : void{
  if(value){
    this.feedbackIdInput = value;
    this.checkFormValidation();
    }
}
caseStatusChange(value: string) : void{
  if(value){
    this.caseStatus = value;
    this.checkFormValidation();
    }
}

checkFormValidation() :void{
  if ((this.feedbackIdInput || this.caseStatus) && (!this.fromDate && !this.toDate)){
    this.allowSearch = true;
  }
  else if(!this.feedbackIdInput && (!this.fromDate && !this.toDate) ){
    this.allowSearch =false;
  }
  else if(this.fromDate && !this.toDate){
    this.allowSearch= false
  } else if(!this.fromDate && this.toDate){
    this.allowSearch = false;
  } else if(this.fromDate > this.toDate){
    this.allowSearch= false;
  }else{
    this.allowSearch=true;
  }
 

}
/// Form Reset
resetForm() : void {
this.reactiveform.reset();
this.allowSearch=false;
}
/// Form Reset

// form-validation ///
  formSearch() {  
    const searchObj= {...this.reactiveform.value, 
      fromDate: formatDate(this.reactiveform.value.fromDate, 'yyyy-mm-dd', 'en-US'),
      toDate: formatDate(this.reactiveform.value.toDate, 'yyyy-mm-dd', 'en-US')}
      this.showLoading = true;
      this.reactiveCasesService.fetchReactiveCasesDataByFilter(searchObj).subscribe(data=>{
        this.reactiveData= data;
        this.loadItems();
        this.showLoading= false;
      },err=>{
        this.errorMessage=err.error.error;
        this.errorCode = err.status;
        console.log(err.error);
        this.showLoading= false;
      })
  }

  
  
}