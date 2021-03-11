import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Tbl_User_Detail } from 'src/app/Models/ReportsModel';
import { DrawerService } from 'src/app/Services/drawer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleDrawer = new EventEmitter<boolean>();

  showMenu  = false;

  constructor(private router:Router, private drawerService: DrawerService) { }
currentUserName:string;
  ngOnInit(): void {
    let curretnUser = (<Tbl_User_Detail>JSON.parse(sessionStorage.getItem("UserInfo")));
    this.currentUserName= curretnUser.UserName;
  }
onlogout(){
this.router.navigate(['/account'])
}


showHideMenu(){
  this.showMenu = !this.showMenu;
  this.toggleDrawer.next(this.showMenu );
 // localStorage.setItem("drawer", this.showMenu.toString());
 this.drawerService.setItem("drawer", this.showMenu.toString());
}

}
