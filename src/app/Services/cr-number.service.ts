import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { crDataModel } from '../Models/crNumber-data.model';
@Injectable({
  providedIn: 'root'
})
export class CrNumberService {

  constructor(private http: HttpClient) { }
  fetchCrNumberData(): Observable<any>{
    return this.http.get<crDataModel[]>('https://atm-cdm-dashboard-default-rtdb.firebaseio.com/cif-data.json')
}
fetchCrNumberDataByFilter(searchObj): Observable<any>{
    console.log(searchObj);
    return this.http.get<crDataModel[]>('https://atm-cdm-dashboard-default-rtdb.firebaseio.com/cif-data.json')
}
}
