export interface MonthlyCaseReg { 
    feedbackId: string; 
    registrationDate: string; 
    username: string; 
    SLADate: string; 
    SLADays: string; 
    IncidentDate: string; 
    daysLeft: string; 
    status: string; 
};
 
export interface CrReport{
     feedbackId: string; 
     registrationDate: string; 
     username: string; 
     SLADate: string; 
     SLADays: string; 
     IncidentDate: string; 
     IssueType: string; 
     status: string; 
}