import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { legalDataModel } from '../Models/legalData.model';

@Injectable({
  providedIn: 'root'
})
export class LegalTypeService {
  getToken(): string {
    return (JSON.parse(localStorage.getItem('token'))).TokenValue;
  }
  constructor(private http: HttpClient) { }
  fetchLegalData(): Observable<any>{
    return this.http.post<legalDataModel[]>(`${environment.API_URL}Legaltype/GetLegalTypeList`,{},{ headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) })
}

fetchLegalDataByID(id):Observable<any>{
  return this.http.post<legalDataModel[]>(`${environment.API_URL}Legaltype/GetLegalType`,id,{ headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) })
}
SaveConfig(obj): Observable<any>{
  console.log(obj);
  return this.http.post<legalDataModel[]>(`${environment.API_URL}Legaltype/SaveLegal`,obj,{ headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) })
 
 }
}
