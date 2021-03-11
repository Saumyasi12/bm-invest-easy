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


  /* public navItems: Array<any> = [];
  testItems: Array<DrawerItem> = [
    { text: 'Visa 130 Files', icon: 'k-i-group-section', selected: true  },
    { text: 'Visa Summary Sheet', icon: 'k-i-detail-section' },
    { text: 'Case History', icon: 'k-i-aggregate-fields' },
    { text: 'Accepted Case Closure Report', icon: 'k-i-track-changes-accept' },
    { text: 'Matched Financial Transaction', icon: 'k-i-track-changes-accept-all' },
    { text: 'Unmatched Financial Transaction', icon: 'k-i-track-changes-reject-all' },
    { text: 'Reconciliation', icon: 'k-i-borders-show-hide' },
    {text: 'User Management', icon: 'k-i-accessibility'}
];
 */

  public expanded = false;
  public dateval = new Date();
  public items: Array<any> = [];
  public userinfo: Tbl_User_Detail = { ID: 0, UserName: "", Usergroup: "", GroupPages: "", Name: "", Password: "",Visa130ColHeaders:""  };;

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
