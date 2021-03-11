import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';



@Injectable({providedIn: 'root'})
export class DrawerService {

    private drawerSub= new Subject();

    watchStorage(): Observable <any>{
        return this.drawerSub.asObservable();
      }

      setItem(key: string, data: any) {
        localStorage.setItem(key, data);
        this.drawerSub.next(data);
      }


}