import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DrawerComponent, DrawerSelectEvent, DrawerItem } from '@progress/kendo-angular-layout';

import { Tbl_User_Detail } from '../../../Models/ReportsModel'

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FullLayoutComponent implements OnInit {

  public expanded = false;
  public dateval = new Date();
  public items: Array<any> = [];
  public userinfo: Tbl_User_Detail = { ID: 0, UserName: "", Usergroup: "", GroupPages: "", Name: "", Password: "" };;

  constructor(public router: Router) {
   
}
  ngOnInit(): void {
    
    this.userinfo = <Tbl_User_Detail>JSON.parse(sessionStorage.getItem("UserInfo"));
    if (this.router.url === '/usermanagement')
      this.userinfo.GroupPages = "usermanagement ";
    setInterval(() => {
      this.dateval = new Date();
    }, 1000);

  }

  

  public NavigateUrl(urldata: string,drawer:DrawerComponent) {
    this.router.navigate([urldata]);
    //drawer.toggle()
  }
  public checkPrevilege(link: string): boolean {
    if (this.userinfo.GroupPages.includes(link))
      return true
    else
      return false
  }

  toggleDrawer(event, drawer:DrawerComponent){
    
    drawer.toggle(event);

  }
 

}
