import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { configDataModel } from '../Models/configData.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigCodeService {

  constructor(private http: HttpClient) { }
  fetchConfigData(): Observable<any>{
    return this.http.get<configDataModel[]>('https://atm-cdm-dashboard-default-rtdb.firebaseio.com/config-data.json')
}
fetchConfigDataByFilter(searchObj): Observable<any>{
  console.log(searchObj);
  return this.http.get<configDataModel[]>('https://atm-cdm-dashboard-default-rtdb.firebaseio.com/config-data.json')
}

fetchConfigDataByID(id):Observable<any>{
  return this.http.get<configDataModel[]>('https://atm-cdm-dashboard-default-rtdb.firebaseio.com/config-data.json')
}
}
