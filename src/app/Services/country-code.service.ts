import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { countryDataModel } from '../Models/countryData.model';

@Injectable({
  providedIn: 'root'
})
export class CountryCodeService {
  getToken(): string {
    return (JSON.parse(localStorage.getItem('token'))).TokenValue;
  }
  constructor(private http: HttpClient) { }
  fetchCountryData(): Observable<any>{
    return this.http.post<countryDataModel[]>(`${environment.API_URL}Country/GetCountryList`,{},{ headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) })
}
fetchCountryDataByID(id):Observable<any>{
  return this.http.post<any>(`${environment.API_URL}Country/GetCountry`,id,{ headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) })
}
SaveCountry(obj): Observable<any>{
 return this.http.post<number>(`${environment.API_URL}Country/SaveCountry`,obj,{ headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) })

} 
}
