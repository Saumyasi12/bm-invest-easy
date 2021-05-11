import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { crDataModel } from '../Models/crNumber-data.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CrNumberService {
  getToken(): string {
    return (JSON.parse(localStorage.getItem('token'))).TokenValue;
  }
  constructor(private http: HttpClient) { }
//   fetchCrNumberData(): Observable<any>{
//     return this.http.get<crDataModel[]>('https://atm-cdm-dashboard-default-rtdb.firebaseio.com/cif-data.json')
// }
fetchCrNumberDataByFilter(searchObj): Observable<any>{  
    return this.http.post<any>(`${environment.API_URL}Report/GetCRDetails`,searchObj, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) })
}
}
