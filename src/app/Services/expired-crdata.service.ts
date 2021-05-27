import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { expiredDataModel } from '../Models/expiredData.model';
import { AppConfig } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class ExpiredCrdataService {
  getToken(): string {
    return (JSON.parse(localStorage.getItem('token'))).TokenValue;
  }
  API_URL: string = ''
  constructor(private http: HttpClient, public config: AppConfig) {
    this.API_URL = config.apiUrl;
  }

  fetchExpiredData(obj): Observable<any> {
    return this.http.post<any>(`${this.API_URL}Report/GetExpiredCRs`, obj, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) })
  }

}
