import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { expiredDataModel } from '../Models/expiredData.model';

@Injectable({
  providedIn: 'root'
})
export class ExpiredCrdataService {

  constructor(private http: HttpClient) { }
  fetchExpiredData(): Observable<any>{
    return this.http.get<expiredDataModel[]>('https://atm-cdm-dashboard-default-rtdb.firebaseio.com/invest-easy-data.json')
}
fetchExpiredDataByFilter(searchObj): Observable<any>{
    console.log(searchObj);
    return this.http.get<expiredDataModel[]>('https://atm-cdm-dashboard-default-rtdb.firebaseio.com/invest-easy-data.json')
}
}
