export interface caseReadyForAction {
  ExcptionType: string,
  count: number
}
export interface caseReadyForClosure {
  ExcptionType: string,
  count: number
}

export interface CaseStatistics {
  FeedbackId: string;
  IssueType: string;
  Status: string;
  Reason: string;
  MessageType: string;
};

export interface RoutingPortalGridData {
  FeedbackId: string;
  AuthCode: string;
  Amount: string;
  RoutingPortal: string;
  CardNo: string;
  Status: string;
};

export interface CaseReadyAction {
  FeedbackId: string;
  CIFNo: string;
  CustomerName: string;
  RegistrationDate: string;
  CardNo: string;
  Status: string;
};
