import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class GetAppPortalService {

  constructor(private http: HttpClient,private common:CommonService) { }

  getPortalInfo(logindetail:any): Observable<any> {
    let auth='Basic '+btoa(logindetail.username+':'+logindetail.password);
    const options = {
      headers: {
        "Content-Type":"application/json; charset=utf-8",
        "Authorization":auth
      }
    };
    return this.http.get<{token: string}>('sfv3/integrumws.nsf/xp_App.xsp/getAppPortal?&email='+logindetail.email,options)
      .pipe(
        map(result => { 
                 return result;
        }),
        catchError(this.common.handleError)
      )
  }
  //sfv3/integrumws.nsf/xp_App.xsp/getViewData?key=Activity_form_New_Iberian&countperpage=10&curpage=4
  getViewData(logindetail:any,para:any ):Observable<any>{
    let auth='Basic '+btoa(logindetail.username+':'+logindetail.password);
    let key=para.key
    let count=para.count
    let curpage=para.curpage
    const options = {
      headers: {
        "Content-Type":"application/json; charset=utf-8",
        "Authorization":auth
      }
    };
    return this.http.get<{token: string}>('sfv3/integrumws.nsf/xp_App.xsp/getViewData?viewid='+key+'&countperpage='+count+'&curpage='+curpage,options)
      .pipe(
        map(result => { 
                 return result;
        }),
        catchError(this.common.handleError)
      )
  }

  getActDocsAssoForms(logindetail:any,para:any ):Observable<any>{
    let auth='Basic '+btoa(logindetail.username+':'+logindetail.password);
    let key=para.key
    const options = {
      headers: {
        "Content-Type":"application/json; charset=utf-8",
        "Authorization":auth
      }
    };
    return this.http.get<{token: string}>('sfv3/integrumws.nsf/xp_App.xsp/getActDocsAssoForms?unid='+key,options)
      .pipe(
        map(result => { 
                 return result;
        }),
        catchError(this.common.handleError)
      )
  }

}
