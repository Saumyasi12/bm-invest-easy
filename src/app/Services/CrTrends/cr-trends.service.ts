import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../src/environments/environment'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CrTrendsService {
  getToken(): string {
    return (JSON.parse(localStorage.getItem('token'))).TokenValue;
  }
  constructor(private http: HttpClient) { }

  fetchCrTrendsWeeklyGraphData(fobj:any): Observable<any>{
    return this.http.post(`${environment.API_URL}Crtrends/GetTrendsWeekly`,fobj,{ headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) }).pipe(map(ev=>{    
      return this.getFinalDataForDaily(ev);   
    }))
  }
  fetchCrTrendsMonthlyGraphData(fobj:any): Observable<any>{
    return this.http.post(`${environment.API_URL}Crtrends/GetTrendsMonthly`,fobj,{ headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) }).pipe(map(ev=>{    
      return this.getFinalDataForMonthly(ev);   
    }))
  }
  fetchCrTrendsYearlyGraphData(fobj:any):  Observable<any>{
    return this.http.post(`${environment.API_URL}Crtrends/GetTrendsYearly`,fobj,{ headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) }).pipe(map(ev=>{    
      return this.getFinalDataForYaerly(ev);   
    }))
  }
  

  private getFinalDataForDaily(res){
   
    var dataItem= {
    Date:[],
    CaseReceived:[],
    CaseProcessed:[]
  }
  res.forEach(el=>{
    dataItem.Date.push({"label":el.WeeKNo});
    dataItem.CaseReceived.push({"value":el.CRReceived});
    dataItem.CaseProcessed.push({"value":el.CRResolved});
  })
  var finalValue={
    "categories": [
      {
        "category": dataItem.Date,
      }
    ],
    "dataset": [
      {
        "seriesname": "CR's Received",
        "data":dataItem.CaseReceived ,
      },
      {
        "seriesname": "CR's Processed",
        "data": dataItem.CaseProcessed ,
      }
    ]
  }
  return finalValue;
  
  }

  private getFinalDataForMonthly(res){
    var dataItem= {
    Date:[],
    CaseReceived:[],
    CaseProcessed:[]
  }
  res.forEach(el=>{
    dataItem.Date.push({"label":el.MonthName});
    dataItem.CaseReceived.push({"value":el.CRReceived});
    dataItem.CaseProcessed.push({"value":el.CRResolved});
  })
  var finalValue={
    "categories": [
      {
        "category": dataItem.Date,
      }
    ],
    "dataset": [
      {
        "seriesname": "CR's Received",
        "data":dataItem.CaseReceived ,
      },
      {
        "seriesname": "CR's Processed",
        "data": dataItem.CaseProcessed ,
      }
    ]
  }
  return finalValue;
  
  }
  private getFinalDataForYaerly(res){
    var dataItem= {
    Date:[],
    CaseReceived:[],
    CaseProcessed:[]
  }
  res.forEach(el=>{
    dataItem.Date.push({"label":el.YearValue});
    dataItem.CaseReceived.push({"value":el.CRReceived});
    dataItem.CaseProcessed.push({"value":el.CRResolved});
  })
  var finalValue={
    "categories": [
      {
        "category": dataItem.Date,
      }
    ],
    "dataset": [
      {
        "seriesname": "CR's Received",
        "data":dataItem.CaseReceived ,
      },
      {
        "seriesname": "CR's Processed",
        "data": dataItem.CaseProcessed ,
      }
    ]
  }
  return finalValue;
  
  }
}
