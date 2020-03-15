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
export class GetousService {

  constructor(private http: HttpClient,private common:CommonService,private httpnative: HTTP) { }


  getous(userid: string,pass:string,domain:string,folder:string): Observable<any> {
    let auth='Basic '+btoa(userid+':'+pass);
    const options = {
        "Content-Type":"application/json; charset=utf-8",
        "Authorization":auth
    };
    return from(this.httpnative.get(domain+'/'+folder+'/integrumws.nsf/xp_App.xsp/getOUs',"",options))
      
  }

  getLoginPic(userid: string,pass:string,domain:string,folder:string): Observable<any> {
  
    let auth='Basic '+btoa(userid+':'+pass);
    const options = {
        "Content-Type":"application/json; charset=utf-8",
        "Authorization":auth
    };
    //return from(this.httpnative.get(domain+'/'+folder+'/appmgt.nsf/xp_ws.xsp/getAppKeyword?client=integrum','',options));
    let url:string = `${AppConfig.domain}/${AppConfig.folder}/appmgt.nsf/xp_ws.xsp/getAppKeyword?client=integrum`;
    return from(this.httpnative.get(url,'',options));
  }

  
}
