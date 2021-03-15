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
    @ViewChild('password')
    public TokenData={TokenValue:"",CreatedTS:new Date()}
    public textbox!: TextBoxComponent;
    public dataitem: any;
    public ngAfterViewInit(): void {
        this.textbox.input.nativeElement.type = 'password';
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
        this.form.markAllAsTouched();

        this.userdata = {
            username: this.form.controls['username'].value,
            password: this.encservice.encryptData(this.form.controls['password'].value)
        }
        this.loginobj.invokelogin(this.userdata).subscribe(result => {
            if (result !== null) {
                this.showSuccess("Login Successful.")
                this.userobj = {
                    ID: result.ID,
                    UserName: result.UserName,
                    Usergroup: result.Usergroup,
                    Password: '',
                    GroupPages: result.GroupPages,
                    Name: result.Name,
                    Visa130ColHeaders:result.Visa130ColHeaders
                }
                this.TokenData={TokenValue:result.Password,CreatedTS:new Date()}
                localStorage.setItem("token",JSON.stringify(this.TokenData))              
                sessionStorage.setItem("UserInfo", JSON.stringify(this.userobj))
                this.router.navigate(["/casestat" ])
            } else {
                this.showError("Invalild Credential.")
            }
        }, error => {
            console.log(error);
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
            if  (listofpages.includes('v_130')) {
                pagename = 'v_130'
            }
           /*  else if (listofpages.includes('wcstat')) {
                pagename = 'wcstat';
            } */
           /*  else if (listofpages.includes('casetrend')) {
                pagename = 'wccasetrend'
            } */
           /*  else if (listofpages.includes('staffpreformance')) {
                pagename = 'staffperformance'
            } */
           /*  else if (listofpages.includes('slastat')) {
                pagename = 'slastat'
            } */
          /*   else if(listofpages.includes('casestat')) {
                pagename = 'casestat';
            } */
            else if (listofpages.includes('v_summary')) {
                pagename = 'v_summary'
            }
            else if (listofpages.includes('reconciliation')) {
                pagename = 'reconciliation'
            }
            else if (listofpages.includes('closurereport')) {
                pagename = 'closurereport'
            }
            else if (listofpages.includes('casehistory')) {
                pagename = 'casehistory'
            }
            else if (listofpages.includes('macthedtran')) {
                pagename = 'macthedtran'
            }
            else if (listofpages.includes('unmacthedtran')) {
                pagename = 'unmacthedtran'
            }
        }

        return pagename;
    }
}
