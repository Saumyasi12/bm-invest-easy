import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../LogIn/login.service';

@Injectable({
  providedIn: 'root'
})

export class RoleGuardService {

  constructor(private _authService: LoginService, private _router: Router) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {  
    
    if(this._authService.decode().GroupPages.includes(next.data.url)) {
      return true;
    }

    // navigate to not found page
    this._router.navigate(['/errorpage']);
    return false;
  }
}
