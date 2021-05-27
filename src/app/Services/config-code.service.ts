import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { configDataModel } from '../Models/configData.model';
import { AppConfig } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigCodeService {
  getToken(): string {
    return (JSON.parse(localStorage.getItem('token'))).TokenValue;
  }
  API_URL:string=''
  constructor(private http:HttpClient,public config:AppConfig) {
    this.API_URL = config.apiUrl;
   } 
  fetchConfigData(): Observable<any>{
    return this.http.post<configDataModel[]>(`${this.API_URL}Config/GetConfigList`,{} ,{ headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) })
}

fetchConfigDataByID(obj):Observable<any>{
  return this.http.post<configDataModel[]>(`${this.API_URL}Config/GetConfig`,obj, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) })
}
SaveConfig(obj):Observable<any>{
  return this.http.post<configDataModel[]>(`${this.API_URL}Config/SaveCinfig`,obj, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) })
}
}
