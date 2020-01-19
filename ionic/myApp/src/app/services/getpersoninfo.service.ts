import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { CommonService } from './common.service';
@Injectable({
  providedIn: 'root'
})
export class GetpersoninfoService {

  constructor(private http: HttpClient,private common:CommonService) { }

getpersoninfo(userid: string,pass:string): Observable<any> {
    let auth='Basic '+btoa(userid+':'+pass);
    const options = {
      headers: {
        "Content-Type":"application/json; charset=utf-8",
        "Authorization":auth
      }
    };
    return this.http.get<{token: string}>('sfv3/integrumws.nsf/xp_webservices.xsp/getPersonInfo?username='+encodeURIComponent(userid),options)
      .pipe(
        map(result => { 
                 return result;
        }),
        catchError(this.common.handleError)
      )
  }




}
