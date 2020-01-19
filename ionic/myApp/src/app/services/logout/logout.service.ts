import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { CommonService } from '../common.service';
@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private http: HttpClient,private common:CommonService) { }

  setLogout(userid: string,pass:string,email:string,language:string,protalGroup:any): Observable<any> {
    let auth='Basic '+btoa(userid+':'+pass);
    const options = {
      headers: {
        "Content-Type":"application/json; charset=utf-8",
        "Authorization":auth
      }
    };
    console.log(options)
    //http://oa.jf81.com/sfv3/appmgt.nsf/xp_ws.xsp/Logout?&email=zding@jf81.com&languageCode=zh&portalGroup=app.integrum Group A
    return this.http.get<{token: string}>('sfv3/appmgt.nsf/xp_ws.xsp/Logout?&email='+email+'&languageCode='+language+'&portalGroup='+protalGroup,options)
      .pipe(
        map(result => { 
                 return result;
        }),
        catchError(this.common.handleError)
      )
  }

}
