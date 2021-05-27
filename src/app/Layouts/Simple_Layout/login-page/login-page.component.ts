import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
import { loginparams } from '../../../Models/ViewModel'
import { Tbl_User_Detail } from '../../../Models/ReportsModel'
import { EncryptdataService } from '../../../Services/Encryption/encryptdata.service'
import { LoginService } from '../../../Services/LogIn/login.service'
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { NotificationService } from '@progress/kendo-angular-notification';



@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
    public userdata: loginparams = { username: "", password: "" }
    public userobj: Tbl_User_Detail;
    @ViewChild('password',{static:true})   
    public textbox!: TextBoxComponent;
    public dataitem: any;
    public showLoading:boolean=false;
    key: string = '';
    public TokenData={TokenValue:"",CreatedTS:new Date()}
    public ngAfterViewInit(): void {
        this.textbox.input.nativeElement.type = 'password';
        this.loginobj.GetKey().subscribe(result => {
            this.key = result;           
        })
    }
    constructor(private loginobj: LoginService, private router: Router, private notificationService: NotificationService, private encservice: EncryptdataService) {
        localStorage.removeItem("token");
        sessionStorage.clear();
    }
    public toggleVisibility(): void {
        const inputEl = this.textbox.input.nativeElement;
        inputEl.type = inputEl.type === 'password' ? 'text' : 'password';
    }

    public form: FormGroup = new FormGroup({
        username: new FormControl(),
        password: new FormControl(),
        loggedin: new FormControl(),
        user: new FormControl()
    });

    public login(): void {
        this.showLoading = true
        this.form.markAllAsTouched();

        this.userdata = {
            username: this.form.controls['username'].value,
            password: this.encservice.encryptPassword(this.form.controls['password'].value,this.key)
        }
        this.loginobj.invokelogin(this.userdata).subscribe(result => {
            debugger
            if (result.ErrorMessage === "") {
                this.showSuccess("Login Successful.")
                this.showLoading = false
                this.userobj = {
                    ID: result.ID,
                    UserName: result.UserDetail.UserName,
                    Usergroup: result.UserDetail.Usergroup,
                    Password: '',
                    GroupPages: result.UserDetail.GroupPages,
                    Name: result.UserDetail.Name
                }
                console.log(JSON.stringify(this.userobj))
                this.TokenData = { TokenValue: result.UserDetail.Password, CreatedTS: new Date() }
                localStorage.setItem("token", JSON.stringify(this.TokenData))
                sessionStorage.setItem("UserInfo", JSON.stringify(this.userobj))
                this.router.navigate(["/" + this.CheckPages(result.UserDetail.GroupPages, result.UserDetail.Usergroup)])
            } else {
                this.showLoading = false
                this.showError(result.ErrorMessage)
            }
        }, error => {
            console.log(error);
            this.showLoading = false
        });
       
    }

    public clearForm(): void {
        this.form.reset();
    }
    public showError(errtext: string): void {
        this.notificationService.show({
            content: errtext,
            hideAfter: 1000,
            position: { horizontal: 'center', vertical: 'bottom' },
            animation: { type: 'fade', duration: 1000 },
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
    public CheckPages(listofpages: string, group: string): string {
        
        let pagename: string = "account";
        if (group.trim().toLowerCase() === "Application User Management Team".toLowerCase()) {
            pagename = 'usermanagement'
        }
        else {
            if  (listofpages.includes('casestat')) {
                pagename = 'casestat'
            }          
            else if (listofpages.includes('crtrendsreport')) {
                pagename = 'crtrendsreport'
            }
            else if (listofpages.includes('crnumber')) {
                pagename = 'crnumber'
            }
            else if (listofpages.includes('expnumber')) {
                pagename = 'expnumber'
            }
            else if (listofpages.includes('exception')) {
                pagename = 'exception'
            }
            else if (listofpages.includes('countrycode')) {
                pagename = 'countrycode'
            }
            else if (listofpages.includes('configcode')) {
                pagename = 'configcode'
            }
            else if (listofpages.includes('legaltype')) {
                pagename = 'legaltype'
            }
            
        }

        return pagename;
    }
}
