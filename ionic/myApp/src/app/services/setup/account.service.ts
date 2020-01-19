import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError,map } from 'rxjs/operators'
import { CommonService } from '../common.service';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(public http: HttpClient,private common:CommonService) { }
  
  getAccount(userid: string,pass:string,email:string): Observable<any> {
    let auth='Basic '+btoa(userid+':'+pass);
    const options = {
      headers: {
        "Content-Type":"application/json; charset=utf-8",
        "Authorization":auth
      }
    };
    return this.http.get<{token: string}>('/sfv3/appmgt.nsf/xp_ws.xsp/getMyAccount?email='+email,options)
      .pipe(
        map(result => { 
                 return result;
        }),
        catchError(this.common.handleError)
      )
  };
  
}
