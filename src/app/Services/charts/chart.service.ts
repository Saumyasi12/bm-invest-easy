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
                {
                    seriesname: "Unprocessed",
                    color: "#7F7F7F",
                    patternangle: "60",
                    patternbgcolor: "#FFFFFF",
                    showValues: "1",
                    "data": [
                        {
                            "value": ev[3]
                        }
                    ]
                },
                
            ]
        return ([data, ev]);
        console.log(data);
       
         })
    )

   }
  
   fetchRoutingPortalData():  Observable<any>{
    return this.http.get('https://bm-atm-cdm-default-rtdb.firebaseio.com/casestat-data.json',{}).pipe(
        map((ev)=>{
             const data= [
                {    
                  
                    color: "#0D274D",
                    "label": "Unactioned",
                    "value": ev[0]
                },
                {
                  color: "#C00000",
                    "label": "Reject",
                    "value": ev[1]
                },
                {
                  color: "#9C9C9C",
                    "label": "Hold",
                    "value":  ev[2]
                },
                {
                  color: "#92D050",
                    "label": "Approve",
                    "value": ev[3]
                },
                {
                  color: "#527BCB",
                    "label": "Reroute",
                    "value":  ev[4]
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
   return this.http.get<caseReadyForAction[]>('https://bm-atm-cdm-default-rtdb.firebaseio.com/casesReady-Maker.json',{})

}
fetchCaseStatisticsData(): Observable<any>{
    return this.http.get<CaseStatistics[]>('https://bm-atm-cdm-default-rtdb.firebaseio.com/caseStatTable-data.json',{})
}

fetchRoutingPortalGridData(): Observable<any>{
    return this.http.post(`${environment.API_URL}CaseStatistics/GetRoutingPortalTableForToday`,{})
}

fetchCaseReadyActionData():Observable<any>{
    return this.http.get('https://bm-atm-cdm-default-rtdb.firebaseio.com/casesReady-Maker.json',{})
}


    
}