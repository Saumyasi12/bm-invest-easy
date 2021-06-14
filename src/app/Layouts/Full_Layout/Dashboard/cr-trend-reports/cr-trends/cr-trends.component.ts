import { Component, OnInit } from '@angular/core';
import { CrTrendsService } from '../../../../../Services/CrTrends/cr-trends.service';

import { chartConfigUI } from '../../../../../common/chartsConfig';
//import {DailyCaseTrendComponent} from './daily-case-trend/daily-case-trend.component';
//import {MonthlyCaseTrendComponent} from './monthly-case-trend/monthly-case-trend.component';
//import {YearlyCaseTrendComponent} from './yearly-case-trend/yearly-case-trend.component'
import { dailydatasource } from '../../case-stat/ChartData/daily'
import { monthlydatasource } from '../../case-stat/ChartData/monthly'
import { yearlydatasource } from '../../case-stat/ChartData/yearly'
import { formatDate } from '@angular/common';
import { forkJoin } from 'rxjs';
import * as signalR from '@microsoft/signalr';
import { AppConfig } from 'src/app/Services/app-config.service';
//import {UserManagementService} from '../../../../Services/UserManagement/user-management.service'
@Component({
  selector: 'app-cr-trends',
  templateUrl: './cr-trends.component.html',
  styleUrls: ['./cr-trends.component.css']
})
export class CrTrendsComponent implements OnInit {

  pageTitle = "CR Trend";

  //----Page Loader--//
  showLoading = true;
  showLoading1 = true;
  showLoading2 = true;
  //error-handling
  errorMessage = null;
  errorCode = null;
  //error-handling
  // public string FromDate { get; set; }

  dataObject = { FromDate: "", ToDate: "", Filter: "" }
  public windowOpened = false;
  weeklyDataSource: object = {};
  monthlyDataSource: object = {};
  yearlyDataSource: object = {};
  public viewflag: number = 0;
  weeklyCrChartConfig: any;
  monthlyCrChartConfig: any;
  yearlyCrChartConfig: any;

  constructor(private crService: CrTrendsService, public config: AppConfig) {
    /*  this.dailydaDataSource=dailydatasource;
     this.monthlyDataSource=monthlydatasource;
     this.yearlyDataSource=yearlydatasource; */
  }

  ngOnInit(): void {
    this.GetGraphDataWeekly();
    this.GetGraphDataMonthly();
    this.GetGraphDataYearly()
    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(this.config.ChartApiUrl + 'notify')
      .build();

    connection.start().then(function () {
      console.log('SignalR Connected');
    }).catch(function (err) {
      return console.error(err.toString());
    });
    connection.on("refreshCRTrends", () => {
      this.GetGraphDataWeekly();
    });
    connection.on("refreshCRTrendsMonthly", () => {
      this.GetGraphDataMonthly();
    });
    connection.on("refreshCRTrendsYearly", () => {
      this.GetGraphDataYearly();
    });

  }

  GetGraphDataWeekly() {
    this.showLoading = true;
    this.crService.fetchCrTrendsWeeklyGraphDataRealtime().subscribe(data => {
      this.weeklyDataSource = {
        "chart": chartConfigUI.crWeeklyChart,
        "categories": data.categories,
        "dataset": data.dataset,
      }
      this.showLoading = false;
      this.errorMessage = null;
      this.errorCode = null;
    }, err => {
      console.log(err);
      this.showLoading = false;
      this.errorMessage = err.message;
      this.errorCode = err.status;
    });
    this.weeklyCrChartConfig = {
      width: '100%',
      height: '160',
      type: 'stackedcolumn2d',
      dataFormat: 'json'
    };
  }
  public GetGraphDataMonthly() {
    this.showLoading1 = true;
    let monthly = this.crService.fetchCrTrendsMonthlyGraphDataRealtime();
    this.crService.fetchCrTrendsMonthlyGraphDataRealtime().subscribe(data => {
      this.monthlyDataSource = {
        "chart": chartConfigUI.crWeeklyChart,
        "categories": data.categories,
        "dataset": data.dataset,
      }
      this.showLoading1 = false;
      this.errorMessage = null;
      this.errorCode = null;
    }, err => {
      console.log(err);
      this.showLoading1 = false;
      this.errorMessage = err.message;
      this.errorCode = err.status;
    });
    this.monthlyCrChartConfig = {
      width: '100%',
      height: '160',
      type: 'stackedcolumn2d',
      dataFormat: 'json'
    };

  }

  public GetGraphDataYearly() {
    this.showLoading2 = true;
    this.crService.fetchCrTrendsYearlyGraphDataRealtime().subscribe(data => {
      this.yearlyDataSource = {
        "chart": chartConfigUI.crWeeklyChart,
        "categories": data.categories,
        "dataset": data.dataset,
      }
      this.showLoading2 = false;
      this.errorMessage = null;
      this.errorCode = null;
    }, err => {
      console.log(err);
      this.showLoading2 = false;
      this.errorMessage = err.message;
      this.errorCode = err.status;
    });
    this.yearlyCrChartConfig = {
      width: '100%',
      height: '160',
      type: 'stackedcolumn2d',
      dataFormat: 'json'
    };
  }

  public close(component) {
    this[component + 'Opened'] = false;
    this.viewflag = 0;
  }

  public open(component, flag: number) {
    this[component + 'Opened'] = true;
    this.viewflag = flag;
  }

}
