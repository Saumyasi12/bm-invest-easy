export class matchedtranfilterclass{
    fromDate:string;
    toDate:string;
    cardno:string;
    membercaseno:string
}
export class FilterClass {
    Fromdate: string
    Todate: string
    FeedbackID: string
    CIFNo: string
}
export interface loginparams{
   username:string;
   password:string;
}
export class MatchFinancialTransactionFilter {
    Fromdate: string
    Todate: string
    CardNumber: string
    MemberCaseNo: string
}
export class ClosureReportFilter {
    FromDate: string
    ToDate: string
    ROLCaseNumber: string
    Status: string
    FinancialCPD: string
}
export class reconciliationfilterclass{
     FromDate:string
     ToDate:string
     CardNumber:string
     MemberCaseNumber:string
}
export class reconciliationAddRowfilterclass{
    valueDate:string;
    postDate:string;
    memberCase:string;
    name:string;
    reference:string;
    cardNumber:string;
    debit:string;
    credit:string;
}
export class TestObj{  
    ValueDate: string;
    PostDate: string;
    MemberCase: string;
    Name: string;
    Reference: string;
    CardNumber: string;
    Debit: string;
    Credit: string;
  }
  export class Visa130filterclass{
    FileType: string;
    FileScheduleDate: string;
}
export class VisaSummaryFormData{
    fileType:string;
    fileDate:string;
  }

  export class VisaSummaryData{  
    MessageType:string;
    RespType:string;
    Count:string;
  }


  export class FeedbackIdFilter{
      feedbackId:string
      reAssingUserName:string
  }

  export class AuthCodeImage
  {
    feedbackID:string
    Authcode:string
  }

  

  export class ReconciliationRemoveRow{
    id:string
}
export class ReconciliationFileUpload
{
  Date:string
  Description:string
  Reference:string
  Debit:string
  Credit:string	
  'Card Number':string
  Addtl:string	
  Comments:string

}

export class StaffPerformanceFilter
{
     Fromdate :string
     ToDate :string
    UserName:string
    Status:string
}