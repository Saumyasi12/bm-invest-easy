import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../src/environments/environment'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {MonthlyCaseReg, CrReport} from '../../Models/CrTrends.Model';


@Injectable({
  providedIn: 'root'
})
export class CrTrendsService {

  constructor(private http: HttpClient) { }

  fetchCrTrendsWeeklyGraphData(): Observable<any>{
    return this.http.get('https://bm-atm-cdm-default-rtdb.firebaseio.com/casesReady-Maker.json')
  }
  fetchCrTrendsMonthlyGraphData(): Observable<any>{
    return this.http.get('https://bm-atm-cdm-default-rtdb.firebaseio.com/casesReady-Maker.json')
  }
  fetchCrTrendsYearlyGraphData(): Observable<any>{
    return this.http.get('https://bm-atm-cdm-default-rtdb.firebaseio.com/casestat-data.json')
  }
  fetchMonthlyCaseRegisteredData(): Observable<any>{
    return this.http.get<MonthlyCaseReg[]>(' https://bm-atm-cdm-default-rtdb.firebaseio.com/casestat-data.json')
  }
  fetchCrCaseReportData(): Observable<any>{
    return this.http.get<CrReport[]>('https://bm-atm-cdm-default-rtdb.firebaseio.com/casestat-data.json')
  }


}
