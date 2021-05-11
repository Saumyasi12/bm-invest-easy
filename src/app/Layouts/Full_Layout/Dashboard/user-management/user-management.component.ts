import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Tbl_User_Detail } from '../../../../Models/ReportsModel'
import { UserManagementService } from '../../../../Services/UserManagement/user-management.service'
import { Pagelist } from './pagelist'
import { NotificationService } from '@progress/kendo-angular-notification';

import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { Router } from '@angular/router';





@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  public user: Tbl_User_Detail;
  public Formuser: Tbl_User_Detail = { ID: 0, UserName: "", Usergroup: "", GroupPages: "", Name: "", Password: "" };
  public userlist: Tbl_User_Detail[] = [];
  public userlist1: Tbl_User_Detail[] = [];
  public form: FormGroup;
  public gridView: GridDataResult;
  public pageSize = 10;
  public skip = 0;
  public headerstyle = { 'background-color': '#E23328', 'color': '#fff', 'line-height': '1em', 'font-size': '14px', 'font-family': 'arial', 'overflow': 'visible', 'white-space': 'normal' };
  public pagelist: any;


  public handleFilterChange(query: string): void {
    const normalizedQuery = query.toLowerCase();
    const filterExpession = item =>
      item.UserName.toLowerCase().indexOf(normalizedQuery) !== -1;
    this.userlist = this.userlist1.filter(filterExpession);
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }
  public data: any = {
    UserName: '',
    ADGroupName: ''
  };
  ngOnInit(): void {
    this.pagelist = Pagelist;
    this.getUserList();
    this.refreshpageList()
  }
  refreshpageList() {
    this.pagelist.forEach(element => {
      element.Checked = false;
    });
  }
  constructor(private cd: ChangeDetectorRef, private serviceobj: UserManagementService, private router: Router, private notificationService: NotificationService, private ref: ChangeDetectorRef) {
    this.loadItems();
    this.form = new FormGroup({
      UserName: new FormControl(this.data.UserName),
      ADGroupName: new FormControl(this.data.ADGroupName),
    });

  }
  private loadItems(): void {

    this.gridView = {
      data: this.userlist.slice(this.skip, this.skip + this.pageSize),
      total: this.userlist.length
    };
  }
  public submitForm(): void {

    if (this.Formuser.ID != 0) {
      this.serviceobj.SavePages(this.Formuser).subscribe(result => {
        if (result != null) {
          this.showSuccess("Data saved successfully.")
        }
      }, error => {
        console.log(error);
        this.showWarning("Something went wrong.")
      });

    }
    else {
      this.showWarning("Please select user.")
    }

    this.clearForm();
  }

  public clearForm(): void {
    this.Formuser = { ID: 0, UserName: "", Usergroup: "", GroupPages: "", Name: "", Password: "" };
    this.pagelist = [];
    this.cd.detectChanges();
    this.pagelist = Pagelist;
    this.refreshpageList()
  }


  public getUserList() {

    this.serviceobj.getUserList().subscribe(result => {
      if (result != null) {
        result.map(item => {
          //console.log(item)
          this.user = {
            UserName: item.UserName,
            Password: item.Password,
            Usergroup: item.Usergroup,
            GroupPages: item.GroupPages,
            ID: item.ID,
            Name: item.Name,
          };
          this.userlist.push(this.user);
        })
        this.userlist1 = this.userlist;
      }
    }, error => {
      console.log(error);
    });
  }

  public getUser(userdata: Tbl_User_Detail) {
    this.Formuser = userdata;
    this.getpagedata(this.Formuser.GroupPages);
  }

  public getpagedata(listofpage: string) {
    debugger
    for (let i = 0; i < this.pagelist.length; i++) {
      if (listofpage.includes(this.pagelist[i].Link)) {
        this.pagelist[i].Checked = true;
      }
      else {
        this.pagelist[i].Checked = false;
      }
    }
  }
  public changepagelist(event, link: string): void {

    if (event.target.checked) {
      if (!this.Formuser.GroupPages.includes(link)) {
        let val = ',' + link.trim()
        this.Formuser.GroupPages += val
      }
    }
    else {
      let val = ',' + link.trim()
      this.Formuser.GroupPages = this.Formuser.GroupPages.replace(val, "");
    }
  }
  public showError(errtext: string): void {
    this.notificationService.show({
      content: errtext,
      hideAfter: 600,
      position: { horizontal: 'center', vertical: 'bottom' },
      animation: { type: 'fade', duration: 600 },
      type: { style: 'error', icon: true }
    });
  }
  public showSuccess(successtext: string): void {
    this.notificationService.show({
      content: successtext,
      hideAfter: 600,
      position: { horizontal: 'center', vertical: 'bottom' },
      animation: { type: 'fade', duration: 600 },
      type: { style: 'success', icon: true }
    });
  }
  public showWarning(warntext: string): void {
    this.notificationService.show({
      content: warntext,
      hideAfter: 600,
      position: { horizontal: 'center', vertical: 'bottom' },
      animation: { type: 'fade', duration: 600 },
      type: { style: 'warning', icon: true }
    });
  }
}


