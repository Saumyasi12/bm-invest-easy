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
  issuelist: string[];
  Monthlycaseform: FormGroup;
  fobj = { FromDate: "", ToDate: "", Status: "", Issue: "" }

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
      console.log(ev);
      this.monthlyDataSource = {
        "chart": chartConfigUI.crWeeklyChart,
        "categories": ev.categories,
        "dataset": ev.dataset,
      }
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
}

