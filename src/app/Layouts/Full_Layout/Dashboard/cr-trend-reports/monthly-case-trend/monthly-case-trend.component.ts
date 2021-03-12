import { Component, OnInit } from '@angular/core';
import { CrTrendsService } from 'src/app/Services/CrTrends/cr-trends.service';
import { chartConfigUI } from '../../case-stat/ChartData/chartsConfig';

@Component({
  selector: 'app-monthly-case-trend',
  templateUrl: './monthly-case-trend.component.html',
  styleUrls: ['./monthly-case-trend.component.css']
})
export class MonthlyCaseTrendComponent implements OnInit {
 
    pageTitle= "Monthly CR Trend";
    monthlyDataSource:any;
    monthlyCrChartConfig:any;
   

    constructor(private crService: CrTrendsService){}

    ngOnInit(){
        this.crService.fetchCrTrendsMonthlyGraphData().subscribe(ev=>{
            console.log(ev);
         
           this.monthlyDataSource ={
             "chart": chartConfigUI.crWeeklyChart,
             "categories":ev.categories,
             "dataset": ev.dataset,
           } 
         });
         this.monthlyCrChartConfig={
            width: '100%',
            height: '400',
            type: 'stackedarea2d',
            dataFormat: 'json'
          };
    }

}

