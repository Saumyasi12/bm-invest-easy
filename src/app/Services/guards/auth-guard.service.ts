import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from '../LogIn/login.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(private _authService: LoginService, private _router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  
    if (this._authService.isAuthenticated()) { 
        return true;
    }

    // navigate to login page
    this._router.navigate(['/account']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }
}
