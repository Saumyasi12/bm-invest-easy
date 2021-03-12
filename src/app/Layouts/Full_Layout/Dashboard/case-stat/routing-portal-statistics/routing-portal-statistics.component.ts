import { Component, EventEmitter, HostListener, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { RoutingPortalGridData } from 'src/app/Models/caseStats.Model';
import { ChartService } from 'src/app/Services/charts/chart.service';
import { chartConfigUI } from '../ChartData/chartsConfig';
//import {routingp} from './routingportal'

@Component({
  selector: 'app-routing-portal-statistics',
  templateUrl: './routing-portal-statistics.component.html',
  styleUrls: ['./routing-portal-statistics.component.css'],
})
export class RoutingPortalStatisticsComponent implements OnInit {
  @Output() onClose = new EventEmitter<boolean>()

  pageTitle = 'CR Statistics';
  public actualdata: any;
  public gridView!: GridDataResult;
  public pageSize = 5;
  public skip = 0;
  public headerstyle = { 'background-color': '#0D274D', 'color': '#fff', 'font-size': '12px', };
  public datasourceRoutingPortal: any = null;
  routingPortalChartConfig: Object;

  routingPortalGridData: RoutingPortalGridData[] = [];


  pageSizeCount: number;
  windowHeight: number;



  @HostListener('window:resize', ['$event']) onResize(event) {

    this.windowHeight = window.innerHeight - 330;
    this.pageSize = Math.ceil(this.windowHeight / 35);
  }


  constructor(private chartService: ChartService) {

  }

  ngOnInit() {

    //Window resize
    this.windowHeight = window.innerHeight - 330;
    this.pageSize = Math.ceil(this.windowHeight / 35);
    //Window resize

    this.chartService.fetchRoutingPortalData().subscribe(ev => {
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
    })

    this.routingPortalChartConfig = {
      width: '100%',
      height: '130',
      type: 'doughnut2d',
      dataFormat: 'json',
    }

    this.chartService.fetchRoutingPortalGridData().subscribe(ev => {
      this.routingPortalGridData = ev;
      this.loadItems();
      // console.log(ev)
    })

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


}