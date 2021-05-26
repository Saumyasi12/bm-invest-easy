import { formatDate } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DialogService } from '@progress/kendo-angular-dialog';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { orderBy, SortDescriptor } from '@progress/kendo-data-query';
import { headerStyle } from 'src/app/common/common.functions';
import { countryDataModel } from 'src/app/Models/countryData.model';
import { CountryCodeService } from 'src/app/Services/country-code.service';

@Component({
  selector: 'app-country-code',
  templateUrl: './country-code.component.html',
  styleUrls: ['./country-code.component.css']
})
export class CountryCodeComponent implements OnInit {
  public viewflag: number = 0;
  pageTitle="Country Code"
  windowHeight: number;
  @HostListener('window:resize', ['$event']) onResize(event) { 
    
    this.windowHeight = window.innerHeight-140;
    this.pageSize  = Math.ceil( this.windowHeight /35);
  }
  //----Page Loader--//
  showLoading =true;

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
  AddcountryForm: FormGroup;
  countryData:countryDataModel[]= [];
  public fields: string[] = [];
  constructor(private fb: FormBuilder, private dialogService: DialogService, private countryCodeService: CountryCodeService) { }
  countryId: string;
  ngOnInit(): void {
    this.windowHeight = window.innerHeight-155;
  this.pageSize  = Math.ceil( this.windowHeight /35);
  // this.generateForm();
  this.rederdata();  
  }

  rederdata(){
    this.showLoading= true;
    this.countryCodeService.fetchCountryData().subscribe(data=>{
      this.countryData= data;
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
    
    if(this.countryData){
      this.gridView = {
        data: this.countryData.slice(this.skip, this.skip + this.pageSize),     
        total: this.countryData.length
      };
    
    }
  }
  private loadSortedItems(): void {
    this.gridView = {
      data: orderBy(this.countryData, this.sort),
      total: this.countryData.length
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
 
  // form-validation ///
  
   //Dialog Work
   public windowOpened = false;


   public close(component) {
    this.rederdata();  
    this[component + 'Opened'] = false;
    this.viewflag = 0;
  }

  public open(component, flag: number,ID:number) {
    this[component + 'Opened'] = true;
    this.countryId=ID.toString();
    this.viewflag = flag;
  }


}
