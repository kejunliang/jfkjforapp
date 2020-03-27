import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable,from } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { CommonService } from './common.service';
import { HTTP } from '@ionic-native/http/ngx';
import {AppConfig } from '../config'
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,private common:CommonService,private httpnative: HTTP) { }

  login(userid: string,pass:string,domain:string,folder:string): Observable<any> {

    let  data={
      "Code": ""
    }
    let auth='Basic '+btoa(userid+':'+pass);
    const options = {
        "Content-Type":"application/json; charset=utf-8",
        "Authorization":auth 
    };
    return from(this.httpnative.post(domain+'/'+folder+'/integrumws.nsf/doLoginSuccessAuth?OpenPage',data,options))
    
  }

  
  
  sendEmail(code:string):Observable<any>{
    let s=new Date();
    let deviceid=s.getTime().toString()
    let  data= {
      "code": code
    }
  
    return from(this.httpnative.post(AppConfig.domain+'/'+AppConfig.folder+'/appmgt.nsf/xp_ws.xsp/UserAuthentication',data,""))
  }
  updateUserInfo(logindetail:any):Observable<any>{
    const {folder,username,email,code,OUCategory} = logindetail;
    const deviceid = "iphone12 001";
    const data = {
      username,
      email,
      "oucategory":OUCategory,
      code,
      deviceid,
      "devicettype":"iphone13 plus"
    }
    return from(this.httpnative.post(AppConfig.domain+'/'+AppConfig.folder+'/appmgt.nsf/xp_ws.xsp/updateUserInfo',data,""))
    
  }
}
