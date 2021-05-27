import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { countryDataModel } from '../Models/countryData.model';
import { AppConfig } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class CountryCodeService {
  getToken(): string {
    return (JSON.parse(localStorage.getItem('token'))).TokenValue;
  }
  API_URL:string=''
  constructor(private http:HttpClient,public config:AppConfig) {
    this.API_URL = config.apiUrl;
   } 
  fetchCountryData(): Observable<any>{
    return this.http.post<countryDataModel[]>(`${this.API_URL}Country/GetCountryList`,{},{ headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) })
}
fetchCountryDataByID(id):Observable<any>{
  return this.http.post<any>(`${this.API_URL}Country/GetCountry`,id,{ headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) })
}
SaveCountry(obj): Observable<any>{
 return this.http.post<number>(`${this.API_URL}Country/SaveCountry`,obj,{ headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) })

} 
}
