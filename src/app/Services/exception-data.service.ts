import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exceptionDataModel } from '../Models/exceptionData,model';

@Injectable({
  providedIn: 'root'
})
export class ExceptionDataService {

  constructor(private http: HttpClient) { }
  fetchExceptionData(): Observable<any>{
    return this.http.get<exceptionDataModel[]>('https://atm-cdm-dashboard-default-rtdb.firebaseio.com/exception-data.json')
}
fetchExceptionDataByFilter(searchObj): Observable<any>{
    console.log(searchObj);
    return this.http.get<exceptionDataModel[]>('https://atm-cdm-dashboard-default-rtdb.firebaseio.com/exception-data.json')
}
}
