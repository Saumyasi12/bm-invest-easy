import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { legalDataModel } from '../Models/legalData.model';

@Injectable({
  providedIn: 'root'
})
export class LegalTypeService {

  constructor(private http: HttpClient) { }
  fetchConfigData(): Observable<any>{
    return this.http.get<legalDataModel[]>('https://atm-cdm-dashboard-default-rtdb.firebaseio.com/legal-data.json')
}
fetchConfigDataByFilter(searchObj): Observable<any>{
  console.log(searchObj);
  return this.http.get<legalDataModel[]>('https://atm-cdm-dashboard-default-rtdb.firebaseio.com/legal-data.json')
}
}
