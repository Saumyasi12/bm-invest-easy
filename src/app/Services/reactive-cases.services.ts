import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ReactiveDataModel } from "../Models/reactive-data.model";

@Injectable({providedIn: 'root'})
export class ReactiveCasesService {
    constructor(private http: HttpClient){
    }

    fetchReactiveCasesData(): Observable<any>{
        return this.http.get<ReactiveDataModel[]>('https://bm-atm-cdm-default-rtdb.firebaseio.com/reactive-data.json')
    }
    fetchReactiveCasesDataByFilter(searchObj): Observable<any>{
        console.log(searchObj);
        return this.http.get<ReactiveDataModel[]>('https://bm-atm-cdm-default-rtdb.firebaseio.com/reactive-data.json')
    }


}