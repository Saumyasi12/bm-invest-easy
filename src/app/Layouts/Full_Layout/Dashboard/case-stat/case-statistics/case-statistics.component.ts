import { Component, EventEmitter, HostListener, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { CaseStatistics } from 'src/app/Models/caseStats.Model';
import { ChartService } from 'src/app/Services/charts/chart.service';
import { chartConfigUI } from '../../../../../common/chartsConfig';
import { CaseStatVar } from './casestatistics';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-case-statistics',
  templateUrl: './case-statistics.component.html',
  styleUrls: ['./case-statistics.component.css'],

})
export class CaseStatisticsComponent {

  @Output() onClose = new EventEmitter<boolean>();

  public actualdata: any;
  public isViewfrom: boolean;
  public viewfromclass = 'boxShadow';
  chart: any;
  FilterObj={Fromdate:"",Todate:"",Filter:""}
  casetatform: FormGroup;
  public gridView!: GridDataResult;
  public pageSize = 5;
  public skip = 0;
  public headerstyle = { 'background-color': '#0D274D', 'color': '#fff', 'font-size': '12px', };
  //private data!: Object[] ;
  allowSearch = false;
  FromDate = null;
  ToDate = null;
  Filter = null;

  public datasourceCasestatisstics: any = null;
  caseStatsChartConfig: { width: string; height: string; type: string; dataFormat: string; };
  pageSizeCount: number;
  windowHeight: number;
  caseStatistics: CaseStatistics[] = [];

  //----Page Loader--//
  showLoading =true;
  fields:string[]=['CRNumber','CIFNumber','InvestEasyStatus','InvestEasyRemarks','T24Status','T24Remarks','ExpiryDate'];
  //error-handling
  errorMessage = null;
  errorCode = null;
  //error-handling



  @HostListener('window:resize', ['$event']) onResize(event) {

    this.windowHeight = window.innerHeight - 330;
    this.pageSize = Math.ceil(this.windowHeight / 35);
  }

  constructor(private chartService: ChartService, private fb: FormBuilder) {

  }

  ngOnInit() {
    //Window resize
    this.windowHeight = window.innerHeight - 330;
    this.pageSize = Math.ceil(this.windowHeight / 35);
    //Window resize    
    this.showLoading = true;
    this.chartService.fetchCaseStatusData(this.FilterObj).subscribe(ev => {
      // console.log(ev.chartData);
      this.actualdata = ev[1];
      this.datasourceCasestatisstics = {
        "chart": chartConfigUI.caseStats,
        "categories": [
          {
            "category": [
              {
                "label": "RIYADH"
              }
            ]
          }
        ],
        "dataset": ev[0]      
      }
        this.showLoading = false;
    }, err=>{
      this.showLoading = false;
      this.errorMessage = 'Something went wrong';
      this.errorCode = err.status;
    });

    this.caseStatsChartConfig = {
      width: '100%',
      height: '145',
      type: 'stackedbar2d',
      dataFormat: 'json'
    };
    this.chartService.fetchCRStatusGridData(this.FilterObj).subscribe(ev => {
      this.caseStatistics = ev;
      
      this.loadItems();
    })

    this.casetatform = this.fb.group({
      Fromdate: new FormControl(),
      Todate: new FormControl(),
      Filter: new FormControl()
    });
  }
  /// form-validation //
FromDateChange(value: Date) : void{
  if(value){
    this.FromDate = value;
    this.checkFormValidation();
    }
  }
  ToDateChange(value: Date) : void{
  if(value){
    this.ToDate = value;
    this.checkFormValidation();
    }
  }
 FilterChange(value: string) : void{
  if(value){
    this.Filter = value;
    this.checkFormValidation();
    }
  }
  
  checkFormValidation() :void{
  if ((this.Filter ) && (!this.FromDate && !this.ToDate)){
    this.allowSearch = true;
  }
  else if(!this.Filter && (!this.FromDate && !this.ToDate) ){
    this.allowSearch =false;
  }
  else if(this.FromDate && !this.ToDate){
    this.allowSearch= false
  } else if(!this.FromDate && this.ToDate){
    this.allowSearch = false;
  } else if(this.FromDate > this.ToDate){
    this.allowSearch= false;
  }else{
    this.allowSearch=true;
  }
  
  
}
  formSearch() {
    this.FilterObj = {
      Fromdate: formatDate(this.casetatform.controls['Fromdate'].value, 'yyyy-MM-dd', 'en-US'), Todate: formatDate(this.casetatform.controls['Todate'].value, 'yyyy-MM-dd', 'en-US'),
      Filter: this.casetatform.controls['Filter'].value
    }

    this.chartService.fetchCaseStatusData(this.FilterObj).subscribe(ev => {
      this.showLoading= true;  
      this.actualdata = ev[1];
      this.datasourceCasestatisstics = {
        "chart": { ...chartConfigUI.caseStats, showValues: "0" },
        "categories": [
          {
            "category": [
              {
                "label": "Case Status"
              }
            ]
          }
        ],
        "dataset": ev[0]
      };
      this.showLoading = false;
    }, err=>{
      this.showLoading = false;
      this.errorMessage = 'Something went wrong';
      this.errorCode = err.status;
    });

    this.chartService.fetchCRStatusGridData(this.FilterObj).subscribe(ev => {
      this.caseStatistics = ev;
      this.loadItems();
    })
  }
  ChangeDateFormat(dt: string): string {
    let res: string = '-'
    try {
      if (dt) {
        res = formatDate(dt, 'MM-dd-yyyy', 'en_US')
      }
    } catch {
      res = dt
    }
    return res;
  }
  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }
  private loadItems(): void {
    this.gridView = {
      data: this.caseStatistics.slice(this.skip, this.skip + this.pageSize),
      total: this.caseStatistics.length
    };
  }

  goBack(): void {

    this.onClose.emit(false);

  }


}





