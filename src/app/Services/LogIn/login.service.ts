import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {  HttpHeaders,HttpClient} from '@angular/common/http';
import {loginparams} from '../../Models/ViewModel'
import {Tbl_User_Detail} from '../../Models/ReportsModel'


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

 
  invokelogin(param:loginparams) {  
    return this.http.post<Tbl_User_Detail>(`${environment.API_URL}Login/CheckLogin`,param);
    }
   

}
