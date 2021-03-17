import { formatDate } from '@angular/common';
import { Component, EventEmitter, HostListener, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { headerStyle, singleDateFormat } from 'src/app/common/common.functions';
import { RoutingPortalGridData } from 'src/app/Models/caseStats.Model';
import { ChartService } from 'src/app/Services/charts/chart.service';
import { chartConfigUI } from '../../../../../common/chartsConfig';
//import {routingp} from './routingportal'

@Component({
  selector: 'app-routing-portal-statistics',
  templateUrl: './routing-portal-statistics.component.html',
  styleUrls: ['./routing-portal-statistics.component.css'],
})
export class RoutingPortalStatisticsComponent implements OnInit {
  @Output() onClose = new EventEmitter<boolean>()

  pageTitle = 'CR Statistics';
  //----Page Loader--//
  showLoading =true;
  FilterObj={Fromdate:"",Todate:"",Filter:""}
  //error-handling
  errorMessage = null;
  errorCode = null;
  //error-handling
 
  public actualdata: any;
  public gridView!: GridDataResult;
  public pageSize = 5;
  public skip = 0;
  public headerstyle = headerStyle;
  public datasourceRoutingPortal: any = null;
  routingPortalChartConfig: Object;
  singleDateFormat = singleDateFormat;

  crStatForm: FormGroup;
  allowSearch = false;
  FromDate = null;
  ToDate = null;
  Filter = null;

  routingPortalGridData: RoutingPortalGridData[] = [];


  pageSizeCount: number;
  windowHeight: number;



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
    this.chartService.fetchRoutingPortalData(this.FilterObj).subscribe(ev => {
      this.actualdata = ev[1]
      this.datasourceRoutingPortal = {
        chart: {
          ...chartConfigUI.routerChart,
          "legendPosition": "absolute",
          "legendXPosition": "10",
          "legendYPosition": "20",
          "pieRadius": "90%",
          "legendNumColumns": "1"
        },
        data: ev[0]
      }
      this.showLoading = false;
    }, err=>{
      this.showLoading = false;
      this.errorMessage = 'Something went wrong';
      this.errorCode = err.status;
    })

    this.routingPortalChartConfig = {
      width: '100%',
      height: '130',
      type: 'doughnut2d',
      dataFormat: 'json',
    }

    this.chartService.fetchRoutingPortalGridData(this.FilterObj).subscribe(ev => {
      this.routingPortalGridData = ev;
      this.loadItems();
      // console.log(ev)
    },  err=>{
      this.showLoading = false;
      this.errorMessage = 'Something went wrong';
      this.errorCode = err.status;
    })

    this.crStatForm = this.fb.group({
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


  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }
  private loadItems(): void {
    this.gridView = {
      data: this.routingPortalGridData.slice(this.skip, this.skip + this.pageSize),
      total: this.routingPortalGridData.length
    };
  }

  goBack(): void {
    this.onClose.emit(false);
  }

  formSearch() {
    this.FilterObj = {
      Fromdate: formatDate(this.crStatForm.controls['Fromdate'].value, 'yyyy-MM-dd', 'en-US'), Todate: formatDate(this.crStatForm.controls['Todate'].value, 'yyyy-MM-dd', 'en-US'),
      Filter: this.crStatForm.controls['Filter'].value
    }
    this.showLoading = true;
    this.chartService.fetchRoutingPortalData(this.FilterObj).subscribe(ev => {
      
      console.log(ev)
      this.actualdata = ev[1];
      this.datasourceRoutingPortal = {
        chart: {
          ...chartConfigUI.routerChart,
          "legendPosition": "absolute",
          "legendXPosition": "10",
          "legendYPosition": "20",
          "pieRadius": "90%",
          "legendNumColumns": "1"
        },
        data: ev[0]
      }
    },err=>{
      this.showLoading = false;
      this.errorMessage = 'Something went wrong';
      this.errorCode = err.status;
    } )
    this.chartService.fetchRoutingPortalGridData(this.FilterObj).subscribe(ev => {
      this.routingPortalGridData = ev;
      this.loadItems();
      // console.log(ev)
    },  err=>{
      this.showLoading = false;
      this.errorMessage = 'Something went wrong';
      this.errorCode = err.status;
    })
    
  }


}