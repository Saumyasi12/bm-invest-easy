import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Tbl_User_Detail } from '../../Models/ReportsModel'
import { AppConfig } from '../app-config.service';

@Injectable({
  providedIn: 'root'
})

export class UserManagementService {
  token: string
  flag: boolean = false;
  API_URL:string='';
  constructor(private http: HttpClient, private router: Router,public config:AppConfig) { 
    this.API_URL = config.apiUrl;
  }
  headers = new HttpHeaders().set('Authorization', `Bearer ${(JSON.parse(localStorage.getItem('token'))).TokenValue}`);

  getUserList() {
    return this.http.get<Tbl_User_Detail[]>(`${this.API_URL}UserManagement/GetListOfUsers`, { headers: this.headers });
  }
  SavePages(filetr: Tbl_User_Detail) {
    return this.http.post<any>(`${this.API_URL}UserManagement/SaveUserPageData`, filetr, { headers: this.headers });
  }

  CheckUserpages(pagename: string) {
    if (sessionStorage.getItem("UserInfo")) {
      if (!(<Tbl_User_Detail>JSON.parse(sessionStorage.getItem("UserInfo"))).GroupPages.includes(pagename)) {
        this.router.navigate(['/errorpage'])
      }
    } else {
      this.router.navigate(['/account'])
    }
  }

}