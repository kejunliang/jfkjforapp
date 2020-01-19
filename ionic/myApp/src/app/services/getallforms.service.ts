import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { CommonService } from './common.service';
@Injectable({
  providedIn: 'root'
})
export class GetallformsService {

  constructor(private http: HttpClient,private common:CommonService) { }

  getAllForms(logindetail:any ):Observable<any>{
    let auth='Basic '+btoa(logindetail.username+':'+logindetail.password);
    const options = {
      headers: {
        "Content-Type":"application/json; charset=utf-8",
        "Authorization":auth
      }
    };
    return this.http.get<{token: string}>('sfv3/integrumws.nsf/xp_App.xsp/getAllForms?ver=v2&languageid&cnname='+encodeURIComponent(logindetail.username),options)
      .pipe(
        map(result => { 
                 return result;
        }),
        catchError(this.common.handleError)
      )
  }


  getFormData(logindetail:any,para:any ):Observable<any>{
    let auth='Basic '+btoa(logindetail.username+':'+logindetail.password);
    let unid=para.unid
    let isedit = para.isedit;
    const options = {
      headers: {
        "Content-Type":"application/json; charset=utf-8",
        "Authorization":auth
      }
    };
    return this.http.get<{token: string}>('sfv3/integrumws.nsf/xp_App.xsp/getDocInfoV2?unid='+unid+'&cnname='+logindetail.username+'&isedit='+isedit,options)
      .pipe(
        map(result => { 
                 return result;
        }),
        catchError(this.common.handleError)
      )
  }
  submit(logindetail:any,para:any ):Observable<any>{
    let auth='Basic '+btoa(logindetail.username+':'+logindetail.password);
    let unid=para.unid
    const options = {
      headers: {
        "Content-Type":"application/json; charset=utf-8",
        "Authorization":auth
      }
    };
    let  data=para
    return this.http.post('/sfv3/integrumws.nsf/xp_App.xsp/submitFormV2',data,options).pipe(
       map(
        result => { 
          return result;
        } 
       )
      
    )
  }
  getLoopupOptions(logindetail:any,para:any):Observable<any>{
    let auth='Basic '+btoa(logindetail.username+':'+logindetail.password);
    let key=para.key;
    let db = para.db;
    let view = para.view;
    let column = para.column;
    const options = {
      headers: {
        "Content-Type":"application/json; charset=utf-8",
        "Authorization":auth
      }
    };
    let sparas = '&db='+db+'&view='+view+'&column='+column;
    return this.http.get<{token: string}>('sfv3/integrumws.nsf/xp_App.xsp/getLookupOption?key='+key+sparas,options)
      .pipe(
        map(result => { 
                 return result;
        }),
        catchError(this.common.handleError)
      )
  }

}
