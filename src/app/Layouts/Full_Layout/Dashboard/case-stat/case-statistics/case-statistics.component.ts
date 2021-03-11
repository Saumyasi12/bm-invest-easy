import { Component, EventEmitter, HostListener, OnInit ,Output,ViewEncapsulation} from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { CaseStatistics } from 'src/app/Models/caseStats.Model';
import { ChartService } from 'src/app/Services/charts/chart.service';
import { chartConfigUI } from '../ChartData/chartsConfig';
import {CaseStatVar} from './casestatistics'



@Component({
  selector: 'app-case-statistics',
  templateUrl: './case-statistics.component.html',
  styleUrls: ['./case-statistics.component.css'],
 
})
export class CaseStatisticsComponent{

  @Output() onClose = new EventEmitter<boolean>();

 public actualdata:any;
  public isViewfrom:boolean;
  public viewfromclass = 'boxShadow';
  chart: any;

  public gridView!: GridDataResult;
  public pageSize = 5;
  public skip = 0;
  public headerstyle={'background-color': '#0D274D','color': '#fff','font-size': '12px',};
  //private data!: Object[] ;


  public datasourceCasestatisstics: any=null;
  caseStatsChartConfig: { width: string; height: string; type: string; dataFormat: string; };
  pageSizeCount: number;
  windowHeight: number;
  caseStatistics: CaseStatistics[]= [];


  @HostListener('window:resize', ['$event']) onResize(event) { 
    
    this.windowHeight = window.innerHeight-330;
    this.pageSize  = Math.ceil( this.windowHeight /35);
  }


  constructor(private chartService: ChartService) {
    
  }

  ngOnInit() {  

    //Window resize
    this.windowHeight = window.innerHeight-330;
    this.pageSize  = Math.ceil( this.windowHeight /35);
    //Window resize
    console.log(this.pageSize)
    

    this.chartService.fetchCaseStatusData().subscribe(ev=>{
     // console.log(ev.chartData);
    this.actualdata=ev[1];
      this.datasourceCasestatisstics ={
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
  });
  this.caseStatsChartConfig={
    width: '100%',
    height: '145',
    type: 'stackedbar2d',
    dataFormat: 'json'
};

this.chartService.fetchCaseStatisticsData().subscribe(ev=>{
  this.caseStatistics = ev;
  this.loadItems();
})
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

  goBack(): void{

    this.onClose.emit(false);
        
  }
  
 //Excel button work
 public excelData: any[] = CaseStatVar;
  public fields: string[] = Object.keys(this.excelData[0]);
}





