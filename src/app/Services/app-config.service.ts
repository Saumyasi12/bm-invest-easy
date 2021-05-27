import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable()
export class AppConfig {
 
    constructor(private httpClient: HttpClient){

    }
  
    apiUrl: string ='';
  
    ensureInit(): Promise<any> {
      return new Promise((r, e) => {
        //mock because can't xhr local file here
        //var content = {"apiUrl" : "http://test.api.com"};
        /* Object.assign(this, content);
        r(content);
   */
        // real code
        
        this.httpClient.get("assets/config.development.json")
          .subscribe(
          (content) => {
              Object.assign(this, content);
              console.log(this)
              r(this);
          },
          reason => e(reason));
      });
    }

}