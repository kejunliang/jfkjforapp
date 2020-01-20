import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable,from } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { CommonService } from '../common.service';
import { HTTP } from '@ionic-native/http/ngx';
import {AppConfig } from '../../config'
@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private http: HttpClient,private common:CommonService,private httpnative: HTTP) { }

  setLogout(userid: string,pass:string,email:string,language:string,protalGroup:any): Observable<any> {
    let auth='Basic '+btoa(userid+':'+pass);
    const options = {
        "Content-Type":"application/json; charset=utf-8",
        "Authorization":auth
    };
    console.log(options)
    //http://oa.jf81.com/sfv3/appmgt.nsf/xp_ws.xsp/Logout?&email=zding@jf81.com&languageCode=zh&portalGroup=app.integrum Group A
    return from(this.httpnative.get(AppConfig.domain+'/sfv3/appmgt.nsf/xp_ws.xsp/Logout?&email='+email+'&languageCode='+language+'&portalGroup='+protalGroup,'',options));
    
  }

}
