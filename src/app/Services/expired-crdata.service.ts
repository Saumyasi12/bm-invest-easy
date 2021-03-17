import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { expiredDataModel } from '../Models/expiredData.model';

@Injectable({
  providedIn: 'root'
})
export class ExpiredCrdataService {
  getToken(): string {
    return (JSON.parse(localStorage.getItem('token'))).TokenValue;
  }
  constructor(private http: HttpClient) { }

  fetchExpiredData(obj): Observable<any>{
    return this.http.post<any>(`${environment.API_URL}Report/GetExpiredCRs`,obj, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) })
}

}
