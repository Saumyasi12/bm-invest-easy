import { formatDate } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DialogService } from '@progress/kendo-angular-dialog';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { orderBy, SortDescriptor } from '@progress/kendo-data-query';
import { headerStyle } from 'src/app/common/common.functions';
import { exceptionDataModel } from 'src/app/Models/exceptionData,model';
import { ExceptionDataService } from 'src/app/Services/exception-data.service';

@Component({
  selector: 'app-exception-data',
  templateUrl: './exception-data.component.html',
  styleUrls: ['./exception-data.component.css']
})
export class ExceptionDataComponent implements OnInit {

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
  crNumber = null;
  exception = null;
  /// Form Reset
  FilterOBJ={FromDate:'',ToDate:'',Filter:'',Exception:''}
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
  expform: FormGroup;
  public gtservice;

  exceptionData:exceptionDataModel[]= [];
  public fields: string[] = [];
  constructor(private fb: FormBuilder, private dialogService: DialogService, private exceptionDataService: ExceptionDataService) { }

  ngOnInit(): void {

    this.windowHeight = window.innerHeight-155;
  this.pageSize  = Math.ceil( this.windowHeight /35);
  this.showLoading= true;
  this.generateForm();
  this.exceptionDataService.fetchExceptionDataByFilter(this.FilterOBJ).subscribe(data=>{
    this.exceptionData= data;
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
    
    if(this.exceptionData){
      this.gridView = {
        data: this.exceptionData.slice(this.skip, this.skip + this.pageSize),     
        total: this.exceptionData.length
      };
    
    }
  }
  private loadSortedItems(): void {
    this.gridView = {
      data: orderBy(this.exceptionData, this.sort),
      total: this.exceptionData.length
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
  this.expform = this.fb.group({
    fromDate: new FormControl(),
    toDate: new FormControl(),
    crNumber: new FormControl(),
    exception: new FormControl(),
    
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
crNumberChange(value: string) : void{
if(value){
  this.crNumber = value;
  this.checkFormValidation();
  }
}

checkFormValidation() :void{
if ((this.crNumber || this.exception) && (!this.fromDate && !this.toDate)){
  this.allowSearch = true;
}
else if(!this.crNumber && (!this.fromDate && !this.toDate) ){
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
this.expform.reset();
this.allowSearch=false;
}
/// Form Reset

// form-validation ///
formSearch() {  
  this.FilterOBJ=
   {
    FromDate: this.expform.value.fromDate, 
    ToDate: this.expform.value.toDate, 
    Filter:this.expform.value.crNumber,
    Exception:this.expform.value.exception
  }
    this.showLoading = true;
    this.exceptionDataService.fetchExceptionDataByFilter(this.FilterOBJ).subscribe(data=>{
      this.exceptionData= data;
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
