import { Injectable } from '@angular/core';
import { environment } from '../../../src/environments/environment'
import { HttpHeaders,HttpClient} from '@angular/common/http';
import {ReconciliationRemoveRow, AuthCodeImage,FeedbackIdFilter,TestObj, matchedtranfilterclass,VisaSummaryData,VisaSummaryFormData,Visa130filterclass,FilterClass,MatchFinancialTransactionFilter,ClosureReportFilter,reconciliationfilterclass} from '../Models/ViewModel'
import {tbl_AuthCode, tbl_UserNameMapping,Matched_FinancialTransaction,tbl_IssuingOutgoingVISA,tbl_VisaAcquiringIncoming,tbl_VisaAcquiringOutgoing,Unmatched_FinancialTransaction,tbl_IssuingIncomingVISA,NonCustom_GLReconciliationTable, tbl_UnassignedTickets, Tbl_User_Detail} from '../Models/ReportsModel'
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SelectColumnService {
  constructor(private http:HttpClient) { }

  headers = new HttpHeaders().set('Authorization', "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjYmM0MDY2Zi02NzI0LTQ5ZWEtODVhMC04MzU2ZjQ0ODY2OWEiLCJ2YWxpZCI6IjEiLCJ1c2VyaWQiOiIxIiwibmFtZSI6IlN1c2hpbCIsImV4cCI6MTYxMjI1MjcyMiwiaXNzIjoiaHR0cDovL3Rlc3RhZC5jb20iLCJhdWQiOiJodHRwOi8vdGVzdGFkLmNvbSJ9.1yMfrOYdMUl5swVIm9TGVKjfL9VlCC6KZgjgHvSFMBk");

  updateVisa130ColumnHeaders(obj:Tbl_User_Detail)
  {
      console.log(`${environment.API_URL}SelectColumn/UpdateVisa130Columns`);
    return this.http.post<number>(`${environment.API_URL}SelectColumn/UpdateVisa130Columns`,obj,{ headers: this.headers});
  }

}