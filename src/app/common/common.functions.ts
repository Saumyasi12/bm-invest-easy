import { formatDate } from "@angular/common";

export const headerStyle={'background-color': '#0D274D','color': '#fff','font-size': '12px'};
export const singleDateFormat=(date : number | string ): string=>{
    if(date!== null)
    return  formatDate( date, "MM-dd-yyyy", "en-US")
    else
    return ""
  }