import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { loginparams } from '../../Models/ViewModel'
import { Tbl_User_Detail } from '../../Models/ReportsModel'
import { AppConfig } from '../app-config.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl: string = ''
  constructor(private http: HttpClient, public config: AppConfig) {
    this.apiUrl = config.apiUrl;
  }

  invokelogin(param: loginparams) {
    return this.http.post<any>(`${this.apiUrl}Login/CheckLogin`, param);
  }
  GetKey() {
    return this.http.post<any>(`${this.apiUrl}Login/getKey`, {});
  }
  isAuthenticated(): boolean {
    return sessionStorage.getItem('UserInfo') != null && this.isTokenExpired();
  }
  isTokenExpired(): boolean {
    return true;
  }
  decode():Tbl_User_Detail  { 
    return JSON.parse(sessionStorage.getItem('UserInfo'))
    }
}
