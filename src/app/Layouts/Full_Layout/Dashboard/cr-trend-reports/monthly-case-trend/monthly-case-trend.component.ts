import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CrTrendsService } from 'src/app/Services/CrTrends/cr-trends.service';
import { chartConfigUI } from '../../../../../common/chartsConfig';

@Component({
  selector: 'app-monthly-case-trend',
  templateUrl: './monthly-case-trend.component.html',
  styleUrls: ['./monthly-case-trend.component.css']
})
export class MonthlyCaseTrendComponent implements OnInit {

  pageTitle = "Monthly CR Trend";
  monthlyDataSource: any;
  monthlyCrChartConfig: any;
  issuelist= ['CR RECEIVED', 'CR PROCESSED'];
  Monthlycaseform: FormGroup;
  fobj = { FromDate: "", ToDate: "", Status: "", Issue: "" }
  FromDate: Date;
  ToDate: Date;
  allowSearch: boolean;
  showLoading= true;
  errorMessage: any;
  errorCode: any;
  Issue: any;

  constructor(private crService: CrTrendsService, private fb: FormBuilder) { }

  ngOnInit() {
    this.Monthlycaseform = this.fb.group({
      FromDate: new FormControl(),
      ToDate: new FormControl(),
      Issue: new FormControl()
    });
    this.fobj = { FromDate: formatDate((new Date().getTime() - (365 * 24 * 60 * 60 * 1000)), 'yyyy-MM-dd', 'en-US'), ToDate: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'), Status: "", Issue: "" }
    this.renderChart(this.fobj)

  }

  renderChart(formObj: any) {
    this.crService.fetchCrTrendsMonthlyGraphData(formObj).subscribe(ev => {
      this.showLoading = true;
      console.log(ev);
      this.monthlyDataSource = {
        "chart": chartConfigUI.crWeeklyChart,
        "categories": ev.categories,
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
    this.monthlyCrChartConfig = {
      width: '100%',
      height: '400',
      type: 'stackedarea2d',
      dataFormat: 'json'
    };
  }
  formSearch() {
    this.fobj = { FromDate: formatDate(this.Monthlycaseform.controls['FromDate'].value, 'yyyy-MM-dd', 'en-US'), ToDate: formatDate(this.Monthlycaseform.controls['ToDate'].value, 'yyyy-MM-dd', 'en-US'), Status: "", Issue: this.Monthlycaseform.controls['Issue'].value }
    this.renderChart(this.fobj)
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
      issueChange(value: Date) : void{
        if(value){
          this.Issue = value;
          this.checkFormValidation();
          }
        }
      
      checkFormValidation() :void{
      if (!this.Issue && (!this.FromDate && !this.ToDate) ){
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
      this.Monthlycaseform.reset();
      this.allowSearch = false;
    }


}

