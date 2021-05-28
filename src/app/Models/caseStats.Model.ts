export interface caseReadyForAction {
  ExcptionType: string,
  count: number
}
export interface caseReadyForClosure {
  ExcptionType: string,
  count: number
}

export interface CaseStatistics {
  CRNumber: string;
  CIFNumber: string;
  Status: string;
  ExpiryDate: string;
  InvestEasyStatus: string;
  InvestEasyRemarks: string;
  T24Status: string;
  T24Remarks: string;
  

};

export interface RoutingPortalGridData {
  CRNumber: string;
  CIFNumber: string;
  ExpiryDate: string;
  InvestEasyStatus: string;
  InvestEasyRemarks: string;
  T24Status: string;
  T24Remarks: string;
};

export interface CaseReadyAction {
  FeedbackId: string;
  CIFNo: string;
  CustomerName: string;
  RegistrationDate: string;
  CardNo: string;
  Status: string;
};
