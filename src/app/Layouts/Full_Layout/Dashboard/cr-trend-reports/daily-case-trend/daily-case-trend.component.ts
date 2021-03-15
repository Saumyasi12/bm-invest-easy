import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CrTrendsService } from 'src/app/Services/CrTrends/cr-trends.service';
import { chartConfigUI } from '../../../../../common/chartsConfig';


@Component({
  selector: 'app-daily-case-trend',
  templateUrl: './daily-case-trend.component.html',
  styleUrls: ['./daily-case-trend.component.css']
})
export class DailyCaseTrendComponent implements OnInit {
  fobj = { FromDate: "", ToDate: "", Status: "", Issue: "" }
    pageTitle= "Weekly CR Trend";
    weeklyCrChartConfig:any;
    weeklyDataSource:any;
    weeklycaseform: FormGroup;
constructor(private crService: CrTrendsService, private fb: FormBuilder) {

  }
  ngOnInit(){

    this.weeklycaseform = this.fb.group({
      FromDate: new FormControl(),
      ToDate: new FormControl()    
    });
    this.fobj={FromDate:formatDate((new Date().getTime()-(90 * 24 * 60 * 60 * 1000)),'yyyy-MM-dd','en-US'),ToDate:formatDate(new Date(),'yyyy-MM-dd','en-US'),Status:"",Issue:""}
    this.RenderChart(this.fobj)
  }

  RenderChart(formobj:any){
    this.crService.fetchCrTrendsWeeklyGraphData(formobj).subscribe(ev=>{ 
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
  formSearch(){
    
    this.fobj = { FromDate:formatDate(this.weeklycaseform.controls['FromDate'].value,'yyyy-MM-dd','en-US') ,ToDate:formatDate(this.weeklycaseform.controls['ToDate'].value,'yyyy-MM-dd','en-US') , Status: "", Issue:'' }
    this.RenderChart(this.fobj)
  }

}
