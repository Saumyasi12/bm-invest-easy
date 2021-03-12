import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../src/environments/environment'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CrTrendsService {

  constructor(private http: HttpClient) { }

  fetchCrTrendsWeeklyGraphData(fobj:any): Observable<any>{
    return this.http.get('https://bm-atm-cdm-default-rtdb.firebaseio.com/weekly-data.json', fobj).pipe(map(ev=>{    
      return this.getFinalDataForDaily(ev);   
    }))
  }
  fetchCrTrendsMonthlyGraphData(fobj:any): Observable<any>{
    return this.http.get('https://bm-atm-cdm-default-rtdb.firebaseio.com/weekly-data.json', fobj).pipe(map(ev=>{    
      return this.getFinalDataForMonthly(ev);   
    }))
  }
  fetchCrTrendsYearlyGraphData(fobj:any):  Observable<any>{
    return this.http.get('https://bm-atm-cdm-default-rtdb.firebaseio.com/weekly-data.json', fobj).pipe(map(ev=>{    
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
    dataItem.Date.push({"label":el.Date});
    dataItem.CaseReceived.push({"value":el.CaseReceived});
    dataItem.CaseProcessed.push({"value":el.CaseProcessed});
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
    dataItem.Date.push({"label":el.GraphMonth});
    dataItem.CaseReceived.push({"value":el.CaseReceived});
    dataItem.CaseProcessed.push({"value":el.CaseProcessed});
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
    dataItem.Date.push({"label":el.GraphYear});
    dataItem.CaseReceived.push({"value":el.CaseReceived});
    dataItem.CaseProcessed.push({"value":el.CaseProcessed});
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
