import { Component, OnInit } from '@angular/core';
import { CrTrendsService } from 'src/app/Services/CrTrends/cr-trends.service';
import { chartConfigUI } from '../../case-stat/ChartData/chartsConfig';

@Component({
  selector: 'app-yearly-case-trend',
  templateUrl: './yearly-case-trend.component.html',
  styleUrls: ['./yearly-case-trend.component.css']
})

export class YearlyCaseTrendComponent  implements OnInit{
  pageTitle = "Yearly Case Trend"
  yearlyDataSource:any;
  yearlyCrChartConfig:any;

  constructor( private crService: CrTrendsService ) { }

  ngOnInit(){
    this.crService.fetchCrTrendsYearlyGraphData().subscribe(ev=>{
      console.log(ev);
     this.yearlyDataSource ={
       "chart": chartConfigUI.crWeeklyChart,
       "categories":ev.categories,
       "dataset": ev.dataset,
     } 
    });

    this.yearlyCrChartConfig={
      width: '100%',
      height: '400',
      type: 'stackedcolumn2d',
      dataFormat: 'json'
    };

  }

}