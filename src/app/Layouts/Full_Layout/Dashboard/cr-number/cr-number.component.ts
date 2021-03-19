import { formatDate } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DialogService } from '@progress/kendo-angular-dialog';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { orderBy, SortDescriptor } from '@progress/kendo-data-query';
import { headerStyle } from 'src/app/common/common.functions';
import { crDataModel } from 'src/app/Models/crNumber-data.model';
import { CrNumberService } from 'src/app/Services/cr-number.service';

@Component({
  selector: 'app-cr-number',
  templateUrl: './cr-number.component.html',
  styleUrls: ['./cr-number.component.css']
})
export class CrNumberComponent implements OnInit {

  // public pagename :  string = 'Reactive Case';
  
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
  FilterOBJ={FromDate:'',ToDate:'',Filter:''}
  crData:crDataModel[]= [];
  public fields: string[] =['CRNumber','CIFNumber','InvestEasyStatus','InvestEasyRemarks','T24Status','T24Remarks','ExpiryDate'];
  constructor(private fb: FormBuilder, private dialogService: DialogService, private crNumberService: CrNumberService) { }

  ngOnInit(): void {
  
    this.windowHeight = window.innerHeight-155;
  this.pageSize  = Math.ceil( this.windowHeight /35);
  this.showLoading= true;
  this.generateForm();
  this.crNumberService.fetchCrNumberDataByFilter(this.FilterOBJ).subscribe(data=>{
    this.crData= data;
    this.showLoading= false;
    this.loadItems();
    
   
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
    
    if(this.crData){
      this.gridView = {
        data: this.crData.slice(this.skip, this.skip + this.pageSize),     
        total: this.crData.length
      };
    
    }
  }
  private loadSortedItems(): void {
    this.gridView = {
      data: orderBy(this.crData, this.sort),
      total: this.crData.length
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
  this.FilterOBJ= {
    FromDate: this.crform.value.fromDate,
    ToDate: this.crform.value.toDate,
    Filter:this.crform.value.crNumber
  }
    this.showLoading = true;
    this.crNumberService.fetchCrNumberDataByFilter(this.FilterOBJ).subscribe(data=>{
      this.crData= data;
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
