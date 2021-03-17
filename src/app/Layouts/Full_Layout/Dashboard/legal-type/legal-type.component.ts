import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DialogService } from '@progress/kendo-angular-dialog';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { orderBy, SortDescriptor } from '@progress/kendo-data-query';
import { headerStyle } from 'src/app/common/common.functions';
import { legalDataModel } from 'src/app/Models/legalData.model';
import { LegalTypeService } from 'src/app/Services/legal-type.service';

@Component({
  selector: 'app-legal-type',
  templateUrl: './legal-type.component.html',
  styleUrls: ['./legal-type.component.css']
})
export class LegalTypeComponent implements OnInit {
  pageTitle = "Legal Type";
  public viewflag: number = 0;
  editAddForm: any;
  windowHeight: number;
  @HostListener('window:resize', ['$event']) onResize(event) { 
    
    this.windowHeight = window.innerHeight-105;
    this.pageSize  = Math.ceil( this.windowHeight /35);
  }
  //----Page Loader--//
  showLoading =true;
  legalId: string;
  allowSearch = false;
  legalType = null;
  status = null;
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
  legalData:legalDataModel[]= [];
  public fields: string[] = [];
  constructor(private fb: FormBuilder, private dialogService: DialogService, private legalTypeService: LegalTypeService) { }

  ngOnInit(): void {
    this.windowHeight = window.innerHeight-105;
  this.pageSize  = Math.ceil( this.windowHeight /35);
  this.showLoading= true;
  // this.generateForm();
  this.legalTypeService.fetchLegalData().subscribe(data=>{
    this.legalData= data;
    this.loadItems();
    this.showLoading= false;
  }, err=>{
    this.errorMessage=err.error.error;
    this.errorCode = err.status;
    this.showLoading= false;
  })

  this.editAddForm = this.fb.group({
    legalType: new FormControl(),
    status: new FormControl(),
    description: new FormControl(),  
   });
  }
  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }
  private loadItems(): void {
    
    if(this.legalData){
      this.gridView = {
        data: this.legalData.slice(this.skip, this.skip + this.pageSize),     
        total: this.legalData.length
      };
    
    }
  }
  private loadSortedItems(): void {
    this.gridView = {
      data: orderBy(this.legalData, this.sort),
      total: this.legalData.length
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
  
  formSearch() {  
    console.log("Form Submit Value");
    
     editAddForm: FormGroup;
     console.log(this.editAddForm.value);
     this.editAddForm.reset();
  }
     public windowOpened = false;


   public close(component) {
    this[component + 'Opened'] = false;
    this.viewflag = 0;
  }

  public open(component, flag: number,ID:number) {
    this[component + 'Opened'] = true;
    this.viewflag = flag;
    this.legalId=ID.toString();
  }

}