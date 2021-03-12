import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { countryDataModel } from '../Models/countryData.model';

@Injectable({
  providedIn: 'root'
})
export class CountryCodeService {

  constructor(private http: HttpClient) { }
  fetchCountryData(): Observable<any>{
    return this.http.get<countryDataModel[]>('https://atm-cdm-dashboard-default-rtdb.firebaseio.com/country-data.json')
}
fetchCountryDataByFilter(searchObj): Observable<any>{
  console.log(searchObj);
  return this.http.get<countryDataModel[]>('https://atm-cdm-dashboard-default-rtdb.firebaseio.com/country-data.json')
}
}
