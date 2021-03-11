import { formatDate } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DialogService } from '@progress/kendo-angular-dialog';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { orderBy, SortDescriptor } from '@progress/kendo-data-query';
import { headerStyle } from 'src/app/common/common.functions';
import { expiredDataModel } from 'src/app/Models/expiredData.model';
import { ExpiredCrdataService } from 'src/app/Services/expired-crdata.service';
@Component({
  selector: 'app-expired-crdata',
  templateUrl: './expired-crdata.component.html',
  styleUrls: ['./expired-crdata.component.css']
})
export class ExpiredCrdataComponent implements OnInit {

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
  crform: FormGroup;
  public gtservice;

  expiredData:expiredDataModel[]= [];
  public fields: string[] = [];
  constructor(private fb: FormBuilder, private dialogService: DialogService, private expiredCrdataService: ExpiredCrdataService) { }

  ngOnInit(): void {

    this.windowHeight = window.innerHeight-155;
  this.pageSize  = Math.ceil( this.windowHeight /35);
  this.showLoading= true;
  this.generateForm();
  this.expiredCrdataService.fetchExpiredData().subscribe(data=>{
    this.expiredData= data;
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
    
    if(this.expiredData){
      this.gridView = {
        data: this.expiredData.slice(this.skip, this.skip + this.pageSize),     
        total: this.expiredData.length
      };
    
    }
  }
  private loadSortedItems(): void {
    this.gridView = {
      data: orderBy(this.expiredData, this.sort),
      total: this.expiredData.length
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
  this.crform = this.fb.group({
    fromDate: new FormControl(),
    toDate: new FormControl(),
    crNumber: new FormControl(),
    
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
if ((this.crNumber || this.caseStatus) && (!this.fromDate && !this.toDate)){
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
this.crform.reset();
this.allowSearch=false;
}
/// Form Reset

// form-validation ///
formSearch() {  
  const searchObj= {...this.crform.value, 
    fromDate: formatDate(this.crform.value.fromDate, 'yyyy-mm-dd', 'en-US'),
    toDate: formatDate(this.crform.value.toDate, 'yyyy-mm-dd', 'en-US')}
    this.showLoading = true;
    this.expiredCrdataService.fetchExpiredDataByFilter(searchObj).subscribe(data=>{
      this.expiredData= data;
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
