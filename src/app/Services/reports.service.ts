import { Injectable } from '@angular/core';
import { environment } from '../../../src/environments/environment'
import { HttpHeaders,HttpClient} from '@angular/common/http';
import {ReconciliationRemoveRow, AuthCodeImage,FeedbackIdFilter,TestObj, matchedtranfilterclass,VisaSummaryData,VisaSummaryFormData,Visa130filterclass,FilterClass,MatchFinancialTransactionFilter,ClosureReportFilter,reconciliationfilterclass} from '../Models/ViewModel'
import {tbl_AuthCode, tbl_UserNameMapping,Matched_FinancialTransaction,tbl_IssuingOutgoingVISA,tbl_VisaAcquiringIncoming,tbl_VisaAcquiringOutgoing,Unmatched_FinancialTransaction,tbl_IssuingIncomingVISA,NonCustom_GLReconciliationTable, tbl_UnassignedTickets} from '../Models/ReportsModel'
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  constructor(private http:HttpClient) { }

  headers = new HttpHeaders().set('Authorization', "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjYmM0MDY2Zi02NzI0LTQ5ZWEtODVhMC04MzU2ZjQ0ODY2OWEiLCJ2YWxpZCI6IjEiLCJ1c2VyaWQiOiIxIiwibmFtZSI6IlN1c2hpbCIsImV4cCI6MTYxMjI1MjcyMiwiaXNzIjoiaHR0cDovL3Rlc3RhZC5jb20iLCJhdWQiOiJodHRwOi8vdGVzdGFkLmNvbSJ9.1yMfrOYdMUl5swVIm9TGVKjfL9VlCC6KZgjgHvSFMBk");
  
  getUnmatchedTransaction(filter:FilterClass)
  {
      return this.http.post<Unmatched_FinancialTransaction[]>(`${environment.API_URL}Reports/GetUnmatched_FinancialTransactions`,filter,{ headers: this.headers});
  }
  getMatchedList(filter:MatchFinancialTransactionFilter)
  {
     return this.http.post<Matched_FinancialTransaction[]>(`${environment.API_URL}Reports/GetMatchFinancialTransaction`,filter,{ headers: this.headers});
  }
  getAcceptedCaseClosureReport(filter:ClosureReportFilter)
  {
     console.log(filter);
     return this.http.post<tbl_IssuingIncomingVISA[]>(`${environment.API_URL}Reports/GetAcceptedCasesClosureReport`,filter,{ headers: this.headers});
  }
  getReconcilliedReport(filter:reconciliationfilterclass)
  {
   console.log(filter);
   return this.http.post<NonCustom_GLReconciliationTable[]>(`${environment.API_URL}Reports/GetReconciliationReport`,filter,{ headers: this.headers});
  }
  addRowToNonCustomReconciliationTable(ipObj:TestObj)
  {
    console.log("Hitting AddEntry_NonCustom_GLReconciliationTable---");
    console.log(ipObj);
    console.log("URL-> "+`${environment.API_URL}Reports/AddEntry_NonCustom_GLReconciliationTable`);
    return this.http.post<any>(`${environment.API_URL}Reports/AddEntry_NonCustom_GLReconciliationTable`,ipObj,{ headers: this.headers});
  }
  markReconciliationRowInActive(filter:ReconciliationRemoveRow)
  {
    console.log("YoU called remove row fn from service"  +filter);
    console.log("URL -> " + `${environment.API_URL}Reports/RemoveRow_NonCustom_GLReconciliationTable` );
    return this.http.post<any>(`${environment.API_URL}Reports/RemoveRow_NonCustom_GLReconciliationTable`,filter,{ headers: this.headers});
  }
  markAllReconciliationRowsInActive()
  {
   console.log("all remove row fn for NonCustom Reconciliation Table");
   return this.http.post(`${environment.API_URL}Reports/InActive_TableData_NonCustom_GLReconciliationTable`,{ headers: this.headers});
  }
 getDebitCreditForReconVieww()
 {
   return this.http.post<Map<string,string>>(`${environment.API_URL}Reports/GetDebitCreditAmountAfterReconciliation`,{ headers: this.headers});
 }

 getVisa130IssueIncomingReport(filter:Visa130filterclass)
 {
  console.log("IssueIncomingReport");
  return this.http.post<tbl_IssuingIncomingVISA[]>(`${environment.API_URL}Reports/GetVISA130Files_IssuingIncoming`,filter,{ headers: this.headers});
 }

 getVisa130IssueOutgoingReport(filter:Visa130filterclass)
 {
  console.log("IssueOutgoingReport");
  return this.http.post<tbl_IssuingOutgoingVISA[]>(`${environment.API_URL}Reports/GetVISA130Files_IssuingOutgoing`,filter,{ headers: this.headers});
 }

 getVisa130AcquiringIncomingReport(filter:Visa130filterclass)
 {
  console.log("AcquiringIncomingReport");
  return this.http.post<tbl_VisaAcquiringIncoming[]>(`${environment.API_URL}Reports/GetVISA130Files_AcquiringIncoming`,filter,{ headers: this.headers});
 }

 getVisa130AcquringOutgoingReport(filter:Visa130filterclass)
 {
  console.log("AcquringOutgoingReport");
  return this.http.post<tbl_VisaAcquiringOutgoing[]>(`${environment.API_URL}Reports/GetVISA130Files_AcquiringOutgoing`,filter,{ headers: this.headers});
 }
 VISASummarySheet(filetr:VisaSummaryFormData) {  
  return this.http.post<VisaSummaryData[]>(`${environment.API_URL}Reports/VISASummarySheet`,filetr,{ headers: this.headers});
  }

  getCaseHistoryReport(filter:FilterClass)
{
  console.log("Case History Report Function");
  console.log(filter);
  return this.http.post<tbl_UnassignedTickets[]>(`${environment.API_URL}Reports/GetCaseHistoryDetails`,filter,{headers:this.headers});
}
GetUserNameList()
{
  return this.http.post<tbl_UserNameMapping[]>(`${environment.API_URL}Reports/GetUserNameList`,{ headers: this.headers});
}
feedbackIdAuthCodeDetails(filter:FeedbackIdFilter)
{
  console.log(filter);
  return this.http.post<tbl_AuthCode[]>(`${environment.API_URL}Reports/GetFeedbackIdDetails`,filter,{headers:this.headers});
}
reOpenFeedbackIdTran(filter:FeedbackIdFilter)
{
  console.log("Reopenign ticket -> ");console.log(filter);
return this.http.post<number>(`${environment.API_URL}Reports/ReOpenFeedbackId`,filter,{headers:this.headers});
}
closeFeedbackIdTran(filter:FeedbackIdFilter)
{
  console.log("Reopenign ticket -> ");console.log(filter);
 return this.http.post<number>(`${environment.API_URL}Reports/CloseFeedbackId`,filter,{headers:this.headers});
}
pickTransaction(filter:FeedbackIdFilter)
{
  console.log(filter); 
  return this.http.post<number>(`${environment.API_URL}Reports/PickTransactionByUserName`,filter,{headers:this.headers});

}
reassigToUserId(filter:FeedbackIdFilter)
{
  console.log(filter)
  return this.http.post<number>(`${environment.API_URL}Reports/ReassignFeedbackId`,filter,{headers:this.headers});
}
getImagesForFeedbackId(filter:FeedbackIdFilter)
{ 
  return this.http.post<string[]>(`${environment.API_URL}Reports/GetImagesForFeedbackId`,filter,{headers:this.headers});
}
getImagesForAuthcode(filter:AuthCodeImage)
{
 
  return this.http.post<string[]>(`${environment.API_URL}Reports/GetImagesForAuthCode`,filter,{headers:this.headers});
}
getimagesRolCase(filter: FeedbackIdFilter)
{
 console.log(filter)
  return this.http.post<string[]>(`${environment.API_URL}Reports/GetImagesForROLCaseNo`,filter,{headers:this.headers});
}
UploadReconciliationData(jsonData:any)
{ console.log("Data Received in Service");
console.log(jsonData);
  return this.http.post<string[]>(`${environment.API_URL}Reports/InsertReconciliationUploadData`,jsonData,{headers:this.headers});
}
}
