import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DialogService } from '@progress/kendo-angular-dialog';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { orderBy, SortDescriptor } from '@progress/kendo-data-query';
import { headerStyle } from 'src/app/common/common.functions';
import { configDataModel } from 'src/app/Models/configData.model';
import { ConfigCodeService } from 'src/app/Services/config-code.service';

@Component({
  selector: 'app-config-code',
  templateUrl: './config-code.component.html',
  styleUrls: ['./config-code.component.css']
})
export class ConfigCodeComponent implements OnInit {

  editAddForm: any;
  windowHeight: number;
  @HostListener('window:resize', ['$event']) onResize(event) { 
    
    this.windowHeight = window.innerHeight-85;
    this.pageSize  = Math.ceil( this.windowHeight /35);
  }
  //----Page Loader--//
  showLoading =true;

  allowSearch = false;
  name = null;
  value = null;
  description = null;
  
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
  // AddcountryForm: FormGroup;
  configData:configDataModel[]= [];
  public fields: string[] = [];
  configId: string;
  constructor(private fb: FormBuilder, private dialogService: DialogService, private configCodeService: ConfigCodeService) { }

  ngOnInit(): void {
    this.windowHeight = window.innerHeight-85;
  this.pageSize  = Math.ceil( this.windowHeight /35);
  this.showLoading= true;
  // this.generateForm();
  this.configCodeService.fetchConfigData().subscribe(data=>{
    this.configData= data;
    console.log(data);
    this.loadItems();
    this.showLoading= false;
  }, err=>{
    this.errorMessage=err.error.error;
    this.errorCode = err.status;
    this.showLoading= false;
  })

  this.editAddForm = this.fb.group({
    name: new FormControl(),
    value: new FormControl(),
    description: new FormControl(),  
   });
  }
  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }
  private loadItems(): void {
    
    if(this.configData){
      this.gridView = {
        data: this.configData.slice(this.skip, this.skip + this.pageSize),     
        total: this.configData.length
      };
    
    }
  }
  private loadSortedItems(): void {
    this.gridView = {
      data: orderBy(this.configData, this.sort),
      total: this.configData.length
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
  //   generateForm(){
  //     this.AddcountryForm = this.fb.group({
  //       countryCode: new FormControl(),
  //       countryName: new FormControl(),
  //       countryShortName: new FormControl(),
      
  //     });
  //  }
  /// form-validation //
  // fromDateChange(value: Date) : void{
  // if(value){
  //   this.fromDate = value;
  //   this.checkFormValidation();
  //   }
  // }
  // toDateChange(value: Date) : void{
  // if(value){
  //   this.toDate = value;
  //   this.checkFormValidation();
  //   }
  // }
  // crNumberChange(value: string) : void{
  // if(value){
  //   this.crNumber = value;
  //   this.checkFormValidation();
  //   }
  // }
  
  // checkFormValidation() :void{
  // if ((this.crNumber || this.caseStatus) && (!this.fromDate && !this.toDate)){
  //   this.allowSearch = true;
  // }
  // else if(!this.crNumber && (!this.fromDate && !this.toDate) ){
  //   this.allowSearch =false;
  // }
  // else if(this.fromDate && !this.toDate){
  //   this.allowSearch= false
  // } else if(!this.fromDate && this.toDate){
  //   this.allowSearch = false;
  // } else if(this.fromDate > this.toDate){
  //   this.allowSearch= false;
  // }else{
  //   this.allowSearch=true;
  // }
  
  
  // }
  /// Form Reset
  // resetForm() : void {
  // this.crform.reset();
  // this.allowSearch=false;
  // }
  /// Form Reset
  
  // form-validation ///
  formSearch() {  
    console.log("Form Submit Value");
    
     editAddForm: FormGroup;
     console.log(this.editAddForm.value);
     this.editAddForm.reset();
    
    }
   //Dialog Work
   public windowOpened = false;

  public close(component) {
     this[component + 'Opened'] = false;
   }

   public open(component) {
     this[component + 'Opened'] = true;
   }

   public opened = false;

  public closedialog(status) {
     console.log(`Dialog result: ${status}`);
     this.opened = false;
   }

   public opendialog(id) {
     this.opened = true;
    this.configId = id;
    console.log(this.configId)
   }

}
