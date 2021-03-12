import { Component, OnInit } from '@angular/core';
import{ CrTrendsService} from '../../../../../Services/CrTrends/cr-trends.service';

import { chartConfigUI } from '../../case-stat/ChartData/chartsConfig';
//import {DailyCaseTrendComponent} from './daily-case-trend/daily-case-trend.component';
//import {MonthlyCaseTrendComponent} from './monthly-case-trend/monthly-case-trend.component';
//import {YearlyCaseTrendComponent} from './yearly-case-trend/yearly-case-trend.component'
import { dailydatasource } from '../../case-stat/ChartData/daily'
import { monthlydatasource } from '../../case-stat/ChartData/monthly'
import { yearlydatasource } from '../../case-stat/ChartData/yearly'
import { formatDate } from '@angular/common';
//import {UserManagementService} from '../../../../Services/UserManagement/user-management.service'
@Component({
  selector: 'app-cr-trends',
  templateUrl: './cr-trends.component.html',
  styleUrls: ['./cr-trends.component.css']
})
export class CrTrendsComponent implements OnInit {

  pageTitle="CR Trend";

  fobj = { FromDate: "", ToDate: "", Status: "", Issue: "" }
  public windowOpened = false;
  weeklyDataSource:any;
  monthlyDataSource:any;
  yearlyDataSource:any;
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
   // this.userservice.CheckUserpages('casetrend')
   this.fobj={FromDate:formatDate((new Date().getTime()-(90 * 24 * 60 * 60 * 1000)),'yyyy-MM-dd','en-US'),ToDate:formatDate(new Date(),'yyyy-MM-dd','en-US'),Status:"",Issue:""}
   this.crService.fetchCrTrendsWeeklyGraphData(this.fobj).subscribe(ev=>{
     console.log(ev);
 
    this.weeklyDataSource ={
      "chart": chartConfigUI.crWeeklyChart,
      "categories":ev.categories,
      "dataset": ev.dataset,
    } 
  });
  this.fobj={FromDate:formatDate((new Date().getTime()-(365 * 24 * 60 * 60 * 1000)),'yyyy-MM-dd','en-US'),ToDate:formatDate(new Date(),'yyyy-MM-dd','en-US'),Status:"",Issue:""}
  this.crService.fetchCrTrendsMonthlyGraphData(this.fobj).subscribe(ev=>{
    console.log(ev);
 
   this.monthlyDataSource ={
     "chart": chartConfigUI.crWeeklyChart,
     "categories":ev.categories,
     "dataset": ev.dataset,
   } 
 });
 this.fobj={FromDate:formatDate((new Date().getTime()-(365 * 24 * 60 * 60 * 1000)),'yyyy-MM-dd','en-US'),ToDate:formatDate(new Date(),'yyyy-MM-dd','en-US'),Status:"",Issue:""}
 this.crService.fetchCrTrendsYearlyGraphData(this.fobj).subscribe(ev=>{
  console.log(ev);
 this.yearlyDataSource ={
   "chart": chartConfigUI.crWeeklyChart,
   "categories":ev.categories,
   "dataset": ev.dataset,
 } 
});
  this.weeklyCrChartConfig={
    width: '100%',
    height: '160',
    type: 'stackedarea2d',
    dataFormat: 'json'
};
this.monthlyCrChartConfig={
  width: '100%',
  height: '160',
  type: 'stackedarea2d',
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
