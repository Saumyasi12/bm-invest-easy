import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { exceptionDataModel } from '../Models/exceptionData,model';
import { AppConfig } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class ExceptionDataService {
  API_URL:string=''
  constructor(private http:HttpClient,public config:AppConfig) {
    this.API_URL = config.apiUrl;
   } 
//   fetchExceptionData(): Observable<any>{
//     return this.http.get<exceptionDataModel[]>('https://atm-cdm-dashboard-default-rtdb.firebaseio.com/exception-data.json')
// }
getToken(): string {
  return (JSON.parse(localStorage.getItem('token'))).TokenValue;
}
fetchExceptionDataByFilter(searchObj): Observable<any>{   
  return this.http.post<any>(`${this.API_URL}Report/GetExcepionData`,searchObj, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) })
}
}
