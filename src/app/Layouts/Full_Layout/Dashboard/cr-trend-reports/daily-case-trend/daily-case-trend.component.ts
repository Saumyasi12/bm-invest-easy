import { Component, OnInit } from '@angular/core';
import { CrTrendsService } from 'src/app/Services/CrTrends/cr-trends.service';
import { chartConfigUI } from '../../case-stat/ChartData/chartsConfig';


@Component({
  selector: 'app-daily-case-trend',
  templateUrl: './daily-case-trend.component.html',
  styleUrls: ['./daily-case-trend.component.css']
})
export class DailyCaseTrendComponent implements OnInit {

    pageTitle= "Weekly CR Trend";
    weeklyCrChartConfig:any;
    weeklyDataSource:any;

constructor(private CrService: CrTrendsService) {

  }
  ngOnInit(){
    this.CrService.fetchCrTrendsWeeklyGraphData().subscribe(ev=>{
        //console.log(ev);
    
       this.weeklyDataSource ={
         "chart": chartConfigUI.crWeeklyChart,
         "categories":ev.categories,
         "dataset": ev.dataset,
       } 
     });
    this.weeklyCrChartConfig={
        width: '100%',
        height: '400',
        type: 'stackedarea2d',
        dataFormat: 'json'
    };
  }


}
