"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserManagementComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var pagelist_1 = require("./pagelist");
var UserManagementComponent = /** @class */ (function () {
    function UserManagementComponent(cd, serviceobj, router, notificationService, ref) {
        this.cd = cd;
        this.serviceobj = serviceobj;
        this.router = router;
        this.notificationService = notificationService;
        this.ref = ref;
        this.Formuser = { ID: 0, UserName: "", Usergroup: "", GroupPages: "", Name: "", Password: "" };
        this.userlist = [];
        this.userlist1 = [];
        this.pageSize = 10;
        this.skip = 0;
        this.headerstyle = { 'background-color': '#E23328', 'color': '#fff', 'line-height': '1em', 'font-size': '14px', 'font-family': 'arial', 'overflow': 'visible', 'white-space': 'normal' };
        this.data = {
            UserName: '',
            ADGroupName: ''
        };
        this.loadItems();
        this.form = new forms_1.FormGroup({
            UserName: new forms_1.FormControl(this.data.UserName),
            ADGroupName: new forms_1.FormControl(this.data.ADGroupName)
        });
    }
    UserManagementComponent.prototype.handleFilterChange = function (query) {
        var normalizedQuery = query.toLowerCase();
        var filterExpession = function (item) {
            return item.UserName.toLowerCase().indexOf(normalizedQuery) !== -1;
        };
        this.userlist = this.userlist1.filter(filterExpession);
    };
    UserManagementComponent.prototype.pageChange = function (event) {
        this.skip = event.skip;
        this.loadItems();
    };
    UserManagementComponent.prototype.ngOnInit = function () {
        this.pagelist = pagelist_1.Pagelist;
        this.getUserList();
        this.refreshpageList();
    };
    UserManagementComponent.prototype.refreshpageList = function () {
        this.pagelist.forEach(function (element) {
            element.Checked = false;
        });
    };
    UserManagementComponent.prototype.loadItems = function () {
        this.gridView = {
            data: this.userlist.slice(this.skip, this.skip + this.pageSize),
            total: this.userlist.length
        };
    };
    UserManagementComponent.prototype.submitForm = function () {
        var _this = this;
        if (this.Formuser.ID != 0) {
            this.serviceobj.SavePages(this.Formuser).subscribe(function (result) {
                if (result != null) {
                    _this.showSuccess("Data saved successfully.");
                }
            }, function (error) {
                console.log(error);
                _this.showWarning("Something went wrong.");
            });
        }
        else {
            this.showWarning("Please select user.");
        }
        this.clearForm();
    };
    UserManagementComponent.prototype.clearForm = function () {
        this.Formuser = { ID: 0, UserName: "", Usergroup: "", GroupPages: "", Name: "", Password: "" };
        this.pagelist = [];
        this.cd.detectChanges();
        this.pagelist = pagelist_1.Pagelist;
        this.refreshpageList();
    };
    UserManagementComponent.prototype.getUserList = function () {
        var _this = this;
        this.serviceobj.getUserList().subscribe(function (result) {
            if (result != null) {
                result.map(function (item) {
                    //console.log(item)
                    _this.user = {
                        UserName: item.UserName,
                        Password: item.Password,
                        Usergroup: item.Usergroup,
                        GroupPages: item.GroupPages,
                        ID: item.ID,
                        Name: item.Name
                    };
                    _this.userlist.push(_this.user);
                });
                _this.userlist1 = _this.userlist;
            }
        }, function (error) {
            console.log(error);
        });
    };
    UserManagementComponent.prototype.getUser = function (userdata) {
        this.Formuser = userdata;
        this.getpagedata(this.Formuser.GroupPages);
    };
    UserManagementComponent.prototype.getpagedata = function (listofpage) {
        debugger;
        for (var i = 0; i < this.pagelist.length; i++) {
            if (listofpage.includes(this.pagelist[i].Link)) {
                this.pagelist[i].Checked = true;
            }
            else {
                this.pagelist[i].Checked = false;
            }
        }
    };
    UserManagementComponent.prototype.changepagelist = function (event, link) {
        if (event.target.checked) {
            if (!this.Formuser.GroupPages.includes(link)) {
                var val = ',' + link.trim();
                this.Formuser.GroupPages += val;
            }
        }
        else {
            var val = ',' + link.trim();
            this.Formuser.GroupPages = this.Formuser.GroupPages.replace(val, "");
        }
    };
    UserManagementComponent.prototype.showError = function (errtext) {
        this.notificationService.show({
            content: errtext,
            hideAfter: 600,
            position: { horizontal: 'center', vertical: 'bottom' },
            animation: { type: 'fade', duration: 600 },
            type: { style: 'error', icon: true }
        });
    };
    UserManagementComponent.prototype.showSuccess = function (successtext) {
        this.notificationService.show({
            content: successtext,
            hideAfter: 600,
            position: { horizontal: 'center', vertical: 'bottom' },
            animation: { type: 'fade', duration: 600 },
            type: { style: 'success', icon: true }
        });
    };
    UserManagementComponent.prototype.showWarning = function (warntext) {
        this.notificationService.show({
            content: warntext,
            hideAfter: 600,
            position: { horizontal: 'center', vertical: 'bottom' },
            animation: { type: 'fade', duration: 600 },
            type: { style: 'warning', icon: true }
        });
    };
    UserManagementComponent = __decorate([
        core_1.Component({
            selector: 'app-user-management',
            templateUrl: './user-management.component.html',
            styleUrls: ['./user-management.component.css']
        })
    ], UserManagementComponent);
    return UserManagementComponent;
}());
exports.UserManagementComponent = UserManagementComponent;
