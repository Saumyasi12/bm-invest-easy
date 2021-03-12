import { Component, OnInit } from '@angular/core';
import{ CrTrendsService} from '../../../../../Services/CrTrends/cr-trends.service';

import { chartConfigUI } from '../../case-stat/ChartData/chartsConfig';
//import {DailyCaseTrendComponent} from './daily-case-trend/daily-case-trend.component';
//import {MonthlyCaseTrendComponent} from './monthly-case-trend/monthly-case-trend.component';
//import {YearlyCaseTrendComponent} from './yearly-case-trend/yearly-case-trend.component'
import { dailydatasource } from '../../case-stat/ChartData/daily'
import { monthlydatasource } from '../../case-stat/ChartData/monthly'
import { yearlydatasource } from '../../case-stat/ChartData/yearly'
//import {UserManagementService} from '../../../../Services/UserManagement/user-management.service'
@Component({
  selector: 'app-cr-trends',
  templateUrl: './cr-trends.component.html',
  styleUrls: ['./cr-trends.component.css']
})
export class CrTrendsComponent implements OnInit {

  pageTitle="CR Trend";



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
   this.crService.fetchCrTrendsWeeklyGraphData().subscribe(ev=>{
     console.log(ev);
 
    this.weeklyDataSource ={
      "chart": chartConfigUI.crWeeklyChart,
      "categories":ev.categories,
      "dataset": ev.dataset,
    } 
  });
  this.crService.fetchCrTrendsMonthlyGraphData().subscribe(ev=>{
    console.log(ev);
 
   this.monthlyDataSource ={
     "chart": chartConfigUI.crWeeklyChart,
     "categories":ev.categories,
     "dataset": ev.dataset,
   } 
 });

 this.crService.fetchCrTrendsYearlyGraphData().subscribe(ev=>{
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
