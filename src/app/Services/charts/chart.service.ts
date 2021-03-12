import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../src/environments/environment'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { caseReadyForAction, CaseStatistics, caseReadyForClosure } from 'src/app/Models/caseStats.Model';


@Injectable({ providedIn: 'root' })
export class ChartService {
  
    constructor(private http: HttpClient){}
    fetchCaseStatusData():  Observable<any>{

       return this.http.get('https://bm-atm-cdm-default-rtdb.firebaseio.com/casestat-data.json',{}).pipe(
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
               
                
            ]
        return ([data, ev]);
        console.log(data);
       
         })
    )

   }
   fetchCaseDataOnFilter(fobj:any):Observable<any>{
    return this.http.get('https://bm-atm-cdm-default-rtdb.firebaseio.com/casestat-data.json',{}).pipe(
        map((ev)=>{
             const data=  [
             {
                 seriesname: "Processed",
                 color: "#92D050",
                 patternangle: "60",
                 patternbgcolor: "#FFFFFF",
               
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
               
                 "data": [
                     {
                         "value": ev[2]
                     }
                 ]
             },
             {
                 seriesname: "Unprocessed",
                 color: "#7F7F7F",
                 patternangle: "60",
                 patternbgcolor: "#FFFFFF",
                
                 "data": [
                     {
                         "value": ev[3]
                     }
                 ]
             },
             
         ]
     return ([data, ev]);
    
      })
 )
}
   fetchRoutingPortalData():  Observable<any>{
    return this.http.get('https://bm-atm-cdm-default-rtdb.firebaseio.com/casestat-data.json',{}).pipe(
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

fetchReadyForClosure():  Observable<any>{
   return this.http.get<caseReadyForClosure[]>('https://bm-atm-cdm-default-rtdb.firebaseio.com/casesReady-Closure.json',{})

}
fetchReadyToAction():  Observable<any>{
   return this.http.get<caseReadyForAction[]>('https://bm-atm-cdm-default-rtdb.firebaseio.com/invest-expiredCr.json',{})

}
fetchCaseStatisticsData(): Observable<any>{
    return this.http.get<CaseStatistics[]>('https://bm-atm-cdm-default-rtdb.firebaseio.com/invest-crStatus.json',{})
}

fetchRoutingPortalGridData(): Observable<any>{
    return this.http.post(`${environment.API_URL}CaseStatistics/GetRoutingPortalTableForToday`,{})
}

fetchCaseReadyActionData():Observable<any>{
    return this.http.get('https://bm-atm-cdm-default-rtdb.firebaseio.com/casesReady-Maker.json',{})
}


    
}