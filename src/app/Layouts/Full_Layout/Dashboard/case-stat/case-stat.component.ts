import { Component, DebugNode, OnInit, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
//import { dataSource } from './ChartData/casestatusdata'
//import { portaldatasource } from './ChartData/Routingportaldata'
import { UserManagementService } from '../../../../Services/UserManagement/user-management.service';

import { ChartService } from 'src/app/Services/charts/chart.service';
import { chartConfigUI } from '../../../../common/chartsConfig';
import { caseReadyForAction ,caseReadyForClosure } from '../../../../Models/caseStats.Model'
import { FilterClass } from 'src/app/Models/ViewModel';

@Component({
  selector: 'app-case-stat',
  templateUrl: './case-stat.component.html',
  styleUrls: ['./case-stat.component.css']
})
export class CaseStatComponent implements OnInit {

  pageTitle = "CR Overview";

   //----Page Loader--//
   showLoading =true;
FilterObj={Fromdate:"",Todate:"",Filter:""}
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

  constructor(private userservice: UserManagementService, private chartService: ChartService) {

  }

  ngOnInit(): void {
   this.showLoading = true
    // console.log(chartConfigUI);
    this.chartService.fetchCaseStatusData(this.FilterObj).subscribe(ev => {
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
    }, err=>{
    this.errorMessage=err.error.error;
    this.errorCode = err.status;
    this.showLoading= false;
  } );
    this.chartService.fetchRoutingPortalData(this.FilterObj).subscribe(ev => {
      this.datasourceRoutingPortal = {
        chart: chartConfigUI.routerChart,
        data: ev[0]
      }
    }, err=>{
      this.errorMessage=err.error.error;
      this.errorCode = err.status;
      this.showLoading= false;
    } );
    this.chartService.fetchReadyToAction(this.FilterObj).subscribe(ev => {
      this.mystar = ev;
      this.totalCount = this.mystar.map(value => value.count).reduce((a, b) => a + b);
    }, err=>{
      this.errorMessage=err.error.error;
      this.errorCode = err.status;
      this.showLoading= false;
    } );

  

    this.caseStatsChartConfig = {
      width: '100%',
      height: '155',
      type: 'stackedbar2d',
      dataFormat: 'json'
    };
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
