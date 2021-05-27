import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { crDataModel } from '../Models/crNumber-data.model';
import { AppConfig } from './app-config.service';
@Injectable({
  providedIn: 'root'
})
export class CrNumberService {
  getToken(): string {
    return (JSON.parse(localStorage.getItem('token'))).TokenValue;
  }
  API_URL: string = ''
  constructor(private http: HttpClient, public config: AppConfig) {
    this.API_URL = config.apiUrl;
  }
  //   fetchCrNumberData(): Observable<any>{
  //     return this.http.get<crDataModel[]>('https://atm-cdm-dashboard-default-rtdb.firebaseio.com/cif-data.json')
  // }
  fetchCrNumberDataByFilter(searchObj): Observable<any> {
    return this.http.post<any>(`${this.API_URL}Report/GetCRDetails`, searchObj, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) })
  }
}
