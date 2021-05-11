import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Tbl_User_Detail } from '../../Models/ReportsModel'

@Injectable({
  providedIn: 'root'
})

export class UserManagementService {
  token: string
  flag: boolean = false;
  constructor(private http: HttpClient, private router: Router) { }

  headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);


  getUserList() {
    return this.http.get<Tbl_User_Detail[]>(`${environment.API_URL}UserManagement/GetListOfUsers`, { headers: this.headers });
  }
  SavePages(filetr: Tbl_User_Detail) {
    return this.http.post<any>(`${environment.API_URL}UserManagement/SaveUserPageData`, filetr, { headers: this.headers });
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