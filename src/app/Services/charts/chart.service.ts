import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { caseReadyForAction, CaseStatistics, caseReadyForClosure } from 'src/app/Models/caseStats.Model';
import { AppConfig } from '../app-config.service';


@Injectable({ providedIn: 'root' })
export class ChartService {
    getToken(): string {
        return (JSON.parse(localStorage.getItem('token'))).TokenValue;
      }
      API_URL:string='';
      ChartApi_Url=''
      constructor(private http:HttpClient,public config:AppConfig) {
        this.API_URL = config.apiUrl;
        this.ChartApi_Url=config.ChartApiUrl;
       } 
       fetchCaseStatusData_Realtime(obj):  Observable<any>{
           debugger
        return this.http.get(`${this.ChartApi_Url}api/Overview/GetCRCount`,{ headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) }).pipe(
            map((ev)=>{
             console.log(ev);
                 const data=  [
                 {
                     seriesname: "Processed",
                     color: "#92D050",
                     patternangle: "60",
                     patternbgcolor: "#FFFFFF",
                     showValues: "1",
                     "data": [
                         {
                             "value": ev[0]
                         }
                     ]
                 },
                 {
                     seriesname: "Business Rule Exception",
                     color: "#0D274D",
                     patternangle: "60",
                     patternbgcolor: "#FFFFFF",
                     showValues: "1",
                     "data": [
                         {
                             "value": ev[1]
                         }
                     ]
                 },
                 {
                     seriesname: "Application Exception",
                     color: "#C00000",
                     patternangle: "60",
                     patternbgcolor: "#FFFFFF",
                     showValues: "1",
                     "data": [
                         {
                             "value": ev[2]
                         }
                     ]
                 },
                 {
                     seriesname: "Unprocessed",
                     color: "#fdce3e",
                     patternangle: "60",
                     patternbgcolor: "#FFFFFF",
                     showValues: "1",
                     "data": [
                         {
                             "value": ev[3]
                         }
                     ]
                 }
                 
             ]
         return ([data, ev]);
         console.log(data);
        
          })
     )
 
    }
    fetchCaseStatusData(obj):  Observable<any>{
       return this.http.post(`${this.API_URL}Overview/GetCRCount`,obj,{ headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) }).pipe(
           map((ev)=>{
            console.log(ev);
                const data=  [
                {
                    seriesname: "Processed",
                    color: "#92D050",
                    patternangle: "60",
                    patternbgcolor: "#FFFFFF",
                    showValues: "1",
                    "data": [
                        {
                            "value": ev[0]
                        }
                    ]
                },
                {
                    seriesname: "Business Rule Exception",
                    color: "#0D274D",
                    patternangle: "60",
                    patternbgcolor: "#FFFFFF",
                    showValues: "1",
                    "data": [
                        {
                            "value": ev[1]
                        }
                    ]
                },
                {
                    seriesname: "Application Exception",
                    color: "#C00000",
                    patternangle: "60",
                    patternbgcolor: "#FFFFFF",
                    showValues: "1",
                    "data": [
                        {
                            "value": ev[2]
                        }
                    ]
                },
                {
                    seriesname: "Unprocessed",
                    color: "#fdce3e",
                    patternangle: "60",
                    patternbgcolor: "#FFFFFF",
                    showValues: "1",
                    "data": [
                        {
                            "value": ev[3]
                        }
                    ]
                }
                
            ]
        return ([data, ev]);
        console.log(data);
       
         })
    )

   }
   fetchRoutingPortalDataRealtime():  Observable<any>{
    return this.http.get(`${this.ChartApi_Url}api/Overview/GetCRStatistics`,{ headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) }).pipe(
        map((ev)=>{
             const data= [
                {                      
                    color: "#0D274D",
                    "label": "CR Received",
                    "value": ev[0]
                },
                {
                  color: "#C00000",
                    "label": "CR Scrapped",
                    "value": ev[1]
                },
                {
                  color: "#527BCB",
                    "label": "CR Updated",
                    "value":  ev[2]
                }
            ]
     return ([data,ev]);
    
      })
 )
}

   fetchRoutingPortalData(obj):  Observable<any>{
    return this.http.post(`${this.API_URL}Overview/GetCrStatisticsGraph`,obj,{ headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) }).pipe(
        map((ev)=>{
             const data= [
                {                      
                    color: "#0D274D",
                    "label": "CR Received",
                    "value": ev[0]
                },
                {
                  color: "#C00000",
                    "label": "CR Scrapped",
                    "value": ev[1]
                },
                {
                  color: "#527BCB",
                    "label": "CR Updated",
                    "value":  ev[2]
                }
            ]
     return ([data,ev]);
    
      })
 )
}


fetchReadyToAction(obj):  Observable<any>{
   return this.http.post<any>(`${this.API_URL}Overview/GetCRExpired`,obj,{ headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) })

}
fetchReadyToActionRealtime(obj):  Observable<any>{
    return this.http.get<any>(`${this.ChartApi_Url}api/Overview/GetExpiredCR`,{ headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) })
 
 }
fetchCRStatusGridData(fobj): Observable<any>{
    return this.http.post<any>(`${this.API_URL}Overview/GetCRTable`,fobj,{ headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) })
}

fetchRoutingPortalGridData(fobj): Observable<any>{
    return this.http.post<any>(`${this.API_URL}Overview/GetCrStatisticsTable`,fobj,{ headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) })
}




    
}