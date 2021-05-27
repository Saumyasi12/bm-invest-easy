import { Injectable } from '@angular/core';
import { environment } from '../../../src/environments/environment'
import { HttpHeaders,HttpClient} from '@angular/common/http';
import {ReconciliationRemoveRow, AuthCodeImage,FeedbackIdFilter,TestObj, matchedtranfilterclass,VisaSummaryData,VisaSummaryFormData,Visa130filterclass,FilterClass,MatchFinancialTransactionFilter,ClosureReportFilter,reconciliationfilterclass} from '../Models/ViewModel'
import {tbl_AuthCode, tbl_UserNameMapping,Matched_FinancialTransaction,tbl_IssuingOutgoingVISA,tbl_VisaAcquiringIncoming,tbl_VisaAcquiringOutgoing,Unmatched_FinancialTransaction,tbl_IssuingIncomingVISA,NonCustom_GLReconciliationTable, tbl_UnassignedTickets, Tbl_User_Detail} from '../Models/ReportsModel'
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { AppConfig } from './app-config.service';
@Injectable({
  providedIn: 'root'
})
export class SelectColumnService {
  API_URL: string = ''
  constructor(private http: HttpClient, public config: AppConfig) {
    this.API_URL = config.apiUrl;
  }

  getToken(): string {
    return (JSON.parse(localStorage.getItem('token'))).TokenValue;
  }
  updateVisa130ColumnHeaders(obj:Tbl_User_Detail)
  {     
    return this.http.post<number>(`${this.API_URL}SelectColumn/UpdateVisa130Columns`,obj,{ headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`) });
  }

}