import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment'
import { configDataModel } from '../Models/configData.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigCodeService {
  getToken(): string {
    return (JSON.parse(localStorage.getItem('token'))).TokenValue;
  }
  constructor(private http: HttpClient) { }
  fetchConfigData(): Observable<any>{
    return this.http.post<configDataModel[]>(`${environment.API_URL}Config/GetConfigList`,{} ,{ headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) })
}

fetchConfigDataByID(obj):Observable<any>{
  return this.http.post<configDataModel[]>(`${environment.API_URL}Config/GetConfig`,obj, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) })
}
SaveConfig(obj):Observable<any>{
  return this.http.post<configDataModel[]>(`${environment.API_URL}Config/SaveCinfig`,obj, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) })
}
}
