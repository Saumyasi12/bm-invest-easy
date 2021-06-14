import { Component, DebugNode, OnInit, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
//import { dataSource } from './ChartData/casestatusdata'
//import { portaldatasource } from './ChartData/Routingportaldata'
import { UserManagementService } from '../../../../Services/UserManagement/user-management.service';

import { ChartService } from 'src/app/Services/charts/chart.service';
import { chartConfigUI } from '../../../../common/chartsConfig';
import { caseReadyForAction, caseReadyForClosure } from '../../../../Models/caseStats.Model'
import { FilterClass } from 'src/app/Models/ViewModel';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { AppConfig } from 'src/app/Services/app-config.service';


@Component({
  selector: 'app-case-stat',
  templateUrl: './case-stat.component.html',
  styleUrls: ['./case-stat.component.css']
})
export class CaseStatComponent implements OnInit {

  pageTitle = "CR Overview";

  //----Page Loader--//
  showLoading = true;
  FilterObj = { Fromdate: "", Todate: "", Filter: "" }
  //error-handling
  errorMessage = null;
  errorCode = null;
  //error-handling

  caseStatsChartConfig: Object;
  routingPortalChartConfig: Object;
  //actionReadyCount: string;
  public windowOpened = false;
  public datasourceCasestatisstics: any = {};
  public datasourceRoutingPortal: any = {};
  public viewflag: number = 0;
  public casestatus: any
  public RoutingPortal: any
  mystar: caseReadyForAction[];
  mystarData: caseReadyForClosure[];

  totalCount: number;
  totalCountClosure: number;

  constructor(private userservice: UserManagementService, private chartService: ChartService,public config:AppConfig) {

  }

  ngOnInit(): void {
    this.showLoading = true
    this.getChartDataForCaseStatus();
  this.getChartDataForCaseStatistics();
  this.getChartDataForExpiredCR();
    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(this.config.ChartApiUrl + 'notify')
      .build();

    connection.start().then(function () {
      console.log('SignalR Connected');
    }).catch(function (err) {
      return console.error(err.toString());
    });


    connection.on("refreshCRStatus", () => {
      this.getChartDataForCaseStatus();
    });
    connection.on("refreshCRStatistics", () => {
      this.getChartDataForCaseStatistics();
    });
    connection.on("refreshExpiredCR", () => {
      this.getChartDataForExpiredCR();
    });
  }
  getChartDataForCaseStatus() {
    // console.log(chartConfigUI);
    this.chartService.fetchCaseStatusData_Realtime(this.FilterObj).subscribe(ev => {
      this.casestatus = ev;
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
      this.errorMessage = null;
      this.errorCode = null;
    }, err => {
      console.log(err.message);
      this.showLoading = false;
      this.errorMessage = err.message;
      this.errorCode = err.status;

    });
    this.caseStatsChartConfig = {
      width: '100%',
      height: '155',
      type: 'stackedbar2d',
      dataFormat: 'json'
    };

    
  }
  getChartDataForExpiredCR(){
    this.chartService.fetchReadyToActionRealtime(this.FilterObj).subscribe(ev => {
      this.mystar = ev;
      this.totalCount = this.mystar.map(value => value.count).reduce((a, b) => a + b);
    }, err => {
      console.log(err);
      this.showLoading = false;
      this.errorMessage = err.message;
      this.errorCode = err.status;
      // this.showLoading= false;
    });   
  }
  getChartDataForCaseStatistics() {
    this.chartService.fetchRoutingPortalDataRealtime().subscribe(ev => {
      this.datasourceRoutingPortal = {
        chart: chartConfigUI.routerChart,
        data: ev[0]
      }
    }, err => {
      console.log(err.message);
      this.showLoading = false;
      this.errorMessage = err.message;
      this.errorCode = err.status;
      //this.showLoading= false;
    });
    this.routingPortalChartConfig = {
      width: '100%',
      height: '210',
      type: 'doughnut2d',
      dataFormat: 'json'
    }

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
/* export interface caseReadyForAction{
  MasterCard:number,
  Visa:number,
  OmanNet:number,
  Onus:number,
  POSECOM:number
} */
