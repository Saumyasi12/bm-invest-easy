import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { legalDataModel } from '../Models/legalData.model';
import { AppConfig } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class LegalTypeService {
  getToken(): string {
    return (JSON.parse(localStorage.getItem('token'))).TokenValue;
  }
  API_URL:string=''
  constructor(private http:HttpClient,public config:AppConfig) {
    this.API_URL = config.apiUrl;
   } 
  fetchLegalData(): Observable<any>{
    return this.http.post<legalDataModel[]>(`${this.API_URL}Legaltype/GetLegalTypeList`,{},{ headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) })
}

fetchLegalDataByID(id):Observable<any>{
  return this.http.post<legalDataModel[]>(`${this.API_URL}Legaltype/GetLegalType`,id,{ headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) })
}
SaveConfig(obj): Observable<any>{
  console.log(obj);
  return this.http.post<legalDataModel[]>(`${this.API_URL}Legaltype/SaveLegal`,obj,{ headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) })
 
 }
}
