import { Component, OnInit } from '@angular/core';
import{ CrTrendsService} from '../../../../../Services/CrTrends/cr-trends.service';

import { chartConfigUI } from '../../../../../common/chartsConfig';
//import {DailyCaseTrendComponent} from './daily-case-trend/daily-case-trend.component';
//import {MonthlyCaseTrendComponent} from './monthly-case-trend/monthly-case-trend.component';
//import {YearlyCaseTrendComponent} from './yearly-case-trend/yearly-case-trend.component'
import { dailydatasource } from '../../case-stat/ChartData/daily'
import { monthlydatasource } from '../../case-stat/ChartData/monthly'
import { yearlydatasource } from '../../case-stat/ChartData/yearly'
import { formatDate } from '@angular/common';
import { forkJoin } from 'rxjs';
//import {UserManagementService} from '../../../../Services/UserManagement/user-management.service'
@Component({
  selector: 'app-cr-trends',
  templateUrl: './cr-trends.component.html',
  styleUrls: ['./cr-trends.component.css']
})
export class CrTrendsComponent implements OnInit {

  pageTitle="CR Trend";

   //----Page Loader--//
   showLoading =true;

  //error-handling
  errorMessage = null;
  errorCode = null;
  //error-handling
  // public string FromDate { get; set; }
 
  dataObject= {FromDate: "", ToDate: "", Filter: ""}
  public windowOpened = false;
  weeklyDataSource: object = {};
  monthlyDataSource :object = {};
  yearlyDataSource :object = {};
  public viewflag: number = 0;
  weeklyCrChartConfig:any;
  monthlyCrChartConfig:any;
  yearlyCrChartConfig:any;

  constructor( private crService: CrTrendsService ) { 
   /*  this.dailydaDataSource=dailydatasource;
    this.monthlyDataSource=monthlydatasource;
    this.yearlyDataSource=yearlydatasource; */
  }

  ngOnInit(): void {

    this.showLoading=true;
    let weekly= this.crService.fetchCrTrendsWeeklyGraphData(this.dataObject);
    let monthly= this.crService.fetchCrTrendsMonthlyGraphData(this.dataObject);
    let yearly= this.crService.fetchCrTrendsYearlyGraphData(this.dataObject);
    const joinedSubs = forkJoin([weekly, monthly, yearly]).subscribe(data=>{
      this.weeklyDataSource ={
        "chart": chartConfigUI.crWeeklyChart,
        "categories":data[0].categories,
        "dataset": data[0].dataset,
      } 
      this.monthlyDataSource ={
        "chart": chartConfigUI.crWeeklyChart,
        "categories":data[1].categories,
        "dataset": data[1].dataset,
      } 
      this.yearlyDataSource ={
        "chart": chartConfigUI.crWeeklyChart,
        "categories":data[2].categories,
        "dataset": data[2].dataset,
      } 

      this.showLoading = false;
      this.errorMessage = null;
      this.errorCode = null;
    }, err=>{
      console.log(err);
      this.showLoading = false;
      this.errorMessage = err.message;
      this.errorCode = err.status;
    });

  
  this.weeklyCrChartConfig={
    width: '100%',
    height: '160',
    type: 'stackedcolumn2d',
    dataFormat: 'json'
};
this.monthlyCrChartConfig={
  width: '100%',
  height: '160',
  type: 'stackedcolumn2d',
  dataFormat: 'json'
};
this.yearlyCrChartConfig={
  width: '100%',
  height: '160',
  type: 'stackedcolumn2d',
  dataFormat: 'json'
};
  }
  public close(component) {
    this[component + 'Opened'] = false;
    this.viewflag=0;
  }

  public open(component,flag:number) {
    this[component + 'Opened'] = true;
    this.viewflag=flag;
  }

}
