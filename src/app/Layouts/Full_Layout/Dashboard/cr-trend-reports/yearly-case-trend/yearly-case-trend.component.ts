import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CrTrendsService } from 'src/app/Services/CrTrends/cr-trends.service';
import { chartConfigUI } from '../../../../../common/chartsConfig';

@Component({
  selector: 'app-yearly-case-trend',
  templateUrl: './yearly-case-trend.component.html',
  styleUrls: ['./yearly-case-trend.component.css']
})

export class YearlyCaseTrendComponent  implements OnInit{
  pageTitle = "Yearly CR Trend"
  yearlyDataSource:any;
  Yearlycaseform:FormGroup;
  yearlyCrChartConfig:any;
  fobj = { FromDate: "", ToDate: "", Status: "", Issue: "" }
  FromDate: Date;
  ToDate: any;
  allowSearch: boolean;
  showLoading= true;
  errorMessage: any;
  errorCode: any;

  constructor( private CrService: CrTrendsService, private fb:FormBuilder) { }

  ngOnInit(){
    //this.fobj={FromDate:formatDate((new Date().getTime()-(365*3 * 24 * 60 * 60 * 1000)),'yyyy-MM-dd','en-US'),ToDate:formatDate(new Date(),'yyyy-MM-dd','en-US'),Status:"",Issue:""} 
   this.RenderChart(this.fobj)
   this.Yearlycaseform = this.fb.group({
    FromDate: new FormControl(),
    ToDate: new FormControl()    
  });
  }
  RenderChart(formObj:any){
    this.showLoading = true;
    this.CrService.fetchCrTrendsYearlyGraphData(formObj).subscribe(ev=>{
      console.log(ev);
     this.yearlyDataSource ={
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

    this.yearlyCrChartConfig={
      width: '100%',
      height: '400',
      type: 'stackedcolumn2d',
      dataFormat: 'json'
    };

  }
  formSearch(){
    this.fobj = { FromDate:formatDate(this.Yearlycaseform.controls['FromDate'].value,'yyyy-MM-dd','en-US') ,ToDate:formatDate(this.Yearlycaseform.controls['ToDate'].value,'yyyy-MM-dd','en-US') , Status: "", Issue:'' }
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
  this.Yearlycaseform.reset();
  this.allowSearch = false;
}
}