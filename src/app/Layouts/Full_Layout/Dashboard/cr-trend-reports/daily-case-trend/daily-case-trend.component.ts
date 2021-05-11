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
    fobj = { FromDate: "", ToDate: "", Filter: "" }
    pageTitle= "Weekly CR Trend";
    weeklyCrChartConfig:any;
    weeklyDataSource:any;
    weeklycaseform: FormGroup;


    //----Page Loader--//
showLoading =true;

//error-handling
errorMessage = null;
errorCode = null;
  FromDate: Date;
  ToDate: Date;
  allowSearch: boolean;
//error-handling
constructor(private crService: CrTrendsService, private fb: FormBuilder) {

  }
  ngOnInit(){

    this.weeklycaseform = this.fb.group({
      FromDate: new FormControl(),
      ToDate: new FormControl()    
    });
    //this.fobj={FromDate:formatDate((new Date().getTime()-(90 * 24 * 60 * 60 * 1000)),'yyyy-MM-dd','en-US'),ToDate:formatDate(new Date(),'yyyy-MM-dd','en-US'),Status:"",Issue:""}
    this.RenderChart(this.fobj)
  }
  RenderChart(formobj:any){
    this.showLoading = true;
    this.crService.fetchCrTrendsWeeklyGraphData(formobj).subscribe(ev=>{ 
      this.weeklyDataSource ={
        "chart": chartConfigUI.crWeeklyChart,
        "categories":ev.categories,
        "dataset": ev.dataset,
      } 
      this.showLoading = false;
      this.errorMessage = null;
      this.errorCode = null;
    }, err=>{
      this.showLoading = false;
      this.errorMessage = 'Something went wrong';
      this.errorCode = err.status;
    });
   this.weeklyCrChartConfig={
       width: '100%',
       height: '400',
       type: 'stackedarea2d',
       dataFormat: 'json'
   };
  }
  formSearch(){
    
    this.fobj = { FromDate:formatDate(this.weeklycaseform.controls['FromDate'].value,'yyyy-MM-dd','en-US') ,ToDate:formatDate(this.weeklycaseform.controls['ToDate'].value,'yyyy-MM-dd','en-US') , Filter: "" }
    this.RenderChart(this.fobj)
  }


     /// form-validation //
FromDateChange(value: Date) : void{
  if(value){
    this.FromDate = value;
    this.checkFormValidation();
    }
  }
  ToDateChange(value: Date) : void{
  if(value){
    this.ToDate = value;
    this.checkFormValidation();
    }
  }

  
  checkFormValidation() :void{
  if (!this.FromDate && !this.ToDate){
    this.allowSearch = true;
  }
  else if(this.FromDate && !this.ToDate){
    this.allowSearch= false
  } else if(!this.FromDate && this.ToDate){
    this.allowSearch = false;
  } else if(this.FromDate > this.ToDate){
    this.allowSearch= false;
  }else{
    this.allowSearch=true;
  }
  
  
}

resetForm(){
  this.weeklycaseform.reset();
  this.allowSearch = false;
}


}
