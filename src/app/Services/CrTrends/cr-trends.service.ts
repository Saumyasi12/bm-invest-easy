import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig } from '../app-config.service';


@Injectable({
  providedIn: 'root'
})
export class CrTrendsService {
  getToken(): string {
    return (JSON.parse(localStorage.getItem('token'))).TokenValue;
  }
  API_URL: string = '';
  Chart_Api_Url = '';
  constructor(private http: HttpClient, public config: AppConfig) {
    this.API_URL = config.apiUrl;
    this.Chart_Api_Url = config.ChartApiUrl;
  }

  fetchCrTrendsWeeklyGraphData(fobj: any): Observable<any> {
    return this.http.post(`${this.API_URL}Crtrends/GetTrendsWeekly`, fobj, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) }).pipe(map(ev => {
      return this.getFinalDataForDaily(ev);
    }))
  }
  fetchCrTrendsWeeklyGraphDataRealtime(): Observable<any> {
    return this.http.get(`${this.Chart_Api_Url}api/CRTrends/GetTrendsWeekly`, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) }).pipe(map(ev => {
      return this.getFinalDataForDaily1(ev);
    }))
  }
  fetchCrTrendsMonthlyGraphData(fobj: any): Observable<any> {
    return this.http.post(`${this.API_URL}Crtrends/GetTrendsMonthly`, fobj, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) }).pipe(map(ev => {
      console.log(JSON.stringify(ev))
      return this.getFinalDataForMonthly(ev);
    }))
  }
  fetchCrTrendsMonthlyGraphDataRealtime(): Observable<any> {
    return this.http.get(`${this.Chart_Api_Url}api/Crtrends/GetTrendsMonthly`, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) }).pipe(map(ev => {
    
      console.log(JSON.stringify(ev))
      return this.getFinalDataForMonthly1(ev);
    }))
  }
  fetchCrTrendsYearlyGraphData(fobj: any): Observable<any> {
    return this.http.post(`${this.API_URL}Crtrends/GetTrendsYearly`, fobj, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) }).pipe(map(ev => {
      return this.getFinalDataForYaerly(ev);
    }))
  }
  fetchCrTrendsYearlyGraphDataRealtime(): Observable<any> {
    return this.http.get(`${this.Chart_Api_Url}api/Crtrends/GetTrendsYearly`, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) }).pipe(map(ev => {
      console.log(JSON.stringify(ev))
      return this.getFinalDataForYaerly1(ev);
    }))
  }

  private getFinalDataForDaily(res) {

    var dataItem = {
      Date: [],
      CaseReceived: [],
      CaseProcessed: []
    }   
    res.forEach(el => {        
      dataItem.Date.push({ "label": el.WeeKNo });
      dataItem.CaseReceived.push({ "value": el.CRReceived });
      dataItem.CaseProcessed.push({ "value": el.CRResolved });
    })
    console.log(dataItem)
    var finalValue = {
      "categories": [
        {
          "category": dataItem.Date,
        }
      ],
      "dataset": [
        {
          "seriesname": "CR's Received",
          "data": dataItem.CaseReceived,
        },
        {
          "seriesname": "CR's Processed",
          "data": dataItem.CaseProcessed,
        }
      ]
    }
    return finalValue;

  }
  private getFinalDataForDaily1(res) {

    var dataItem = {
      Date: [],
      CaseReceived: [],
      CaseProcessed: []
    }
    console.log(JSON.stringify(res))
    res.forEach(el => {
          
      dataItem.Date.push({ "label": el.weeKNo });
      dataItem.CaseReceived.push({ "value": el.crReceived });
      dataItem.CaseProcessed.push({ "value": el.crResolved });
    })
    console.log(dataItem)
    var finalValue = {
      "categories": [
        {
          "category": dataItem.Date,
        }
      ],
      "dataset": [
        {
          "seriesname": "CR's Received",
          "data": dataItem.CaseReceived,
        },
        {
          "seriesname": "CR's Processed",
          "data": dataItem.CaseProcessed,
        }
      ]
    }
    return finalValue;

  }

  private getFinalDataForMonthly(res) {
    var dataItem = {
      Date: [],
      CaseReceived: [],
      CaseProcessed: []
    }

    res.forEach(el => {
      
      dataItem.Date.push({ "label": el.MonthName });
      dataItem.CaseReceived.push({ "value": el.CRReceived });
      dataItem.CaseProcessed.push({ "value": el.CRResolved });
    })
    var finalValue = {
      "categories": [
        {
          "category": dataItem.Date,
        }
      ],
      "dataset": [
        {
          "seriesname": "CR's Received",
          "data": dataItem.CaseReceived,
        },
        {
          "seriesname": "CR's Processed",
          "data": dataItem.CaseProcessed,
        }
      ]
    }
    return finalValue;

  }
  private getFinalDataForMonthly1(res) {
    var dataItem = {
      Date: [],
      CaseReceived: [],
      CaseProcessed: []
    }
  
    res.forEach(el => {
      
      dataItem.Date.push({ "label": el.monthName });
      dataItem.CaseReceived.push({ "value": el.crReceived });
      dataItem.CaseProcessed.push({ "value": el.crResolved });
    })
    var finalValue = {
      "categories": [
        {
          "category": dataItem.Date,
        }
      ],
      "dataset": [
        {
          "seriesname": "CR's Received",
          "data": dataItem.CaseReceived,
        },
        {
          "seriesname": "CR's Processed",
          "data": dataItem.CaseProcessed,
        }
      ]
    }
    return finalValue;

  }

  private getFinalDataForYaerly(res) {
    var dataItem = {
      Date: [],
      CaseReceived: [],
      CaseProcessed: []
    }
 
    res.forEach(el => {
      dataItem.Date.push({ "label": el.YearValue });
      dataItem.CaseReceived.push({ "value": el.CRReceived });
      dataItem.CaseProcessed.push({ "value": el.CRResolved });
    })
    var finalValue = {
      "categories": [
        {
          "category": dataItem.Date,
        }
      ],
      "dataset": [
        {
          "seriesname": "CR's Received",
          "data": dataItem.CaseReceived,
        },
        {
          "seriesname": "CR's Processed",
          "data": dataItem.CaseProcessed,
        }
      ]
    }
    return finalValue;

  }
  private getFinalDataForYaerly1(res) {
    var dataItem = {
      Date: [],
      CaseReceived: [],
      CaseProcessed: []
    }
 
    res.forEach(el => {
      dataItem.Date.push({ "label": el.yearValue });
      dataItem.CaseReceived.push({ "value": el.crReceived });
      dataItem.CaseProcessed.push({ "value": el.CrResolved });
    })
    var finalValue = {
      "categories": [
        {
          "category": dataItem.Date,
        }
      ],
      "dataset": [
        {
          "seriesname": "CR's Received",
          "data": dataItem.CaseReceived,
        },
        {
          "seriesname": "CR's Processed",
          "data": dataItem.CaseProcessed,
        }
      ]
    }
    return finalValue;

  }
}
