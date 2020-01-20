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
export class GetallformsService {

  constructor(private http: HttpClient,private common:CommonService,private httpnative: HTTP) { }

  getAllForms(logindetail:any ):Observable<any>{
    let auth='Basic '+btoa(logindetail.username+':'+logindetail.password);
    const options = {
        "Content-Type":"application/json; charset=utf-8",
        "Authorization":auth
    };
    return from(this.httpnative.get(AppConfig.domain+'/sfv3/integrumws.nsf/xp_App.xsp/getAllForms?ver=v2&languageid&cnname='+encodeURIComponent(logindetail.username),'',options));
  }


  getFormData(logindetail:any,para:any ):Observable<any>{
    let auth='Basic '+btoa(logindetail.username+':'+logindetail.password);
    let unid=para.unid
    let isedit = para.isedit;
    const options = {
        "Content-Type":"application/json; charset=utf-8",
        "Authorization":auth
    };
    return from(this.httpnative.get(AppConfig.domain+'/sfv3/integrumws.nsf/xp_App.xsp/getDocInfoV2?unid='+unid+'&cnname='+logindetail.username+'&isedit='+isedit,'',options));
  }
  submit(logindetail:any,para:any ):Observable<any>{
    let auth='Basic '+btoa(logindetail.username+':'+logindetail.password);
    let unid=para.unid
    const options = {
        "Content-Type":"application/json; charset=utf-8",
        "Authorization":auth
    };
    console.log('para:',para)
    let  data=para
    this.httpnative.setDataSerializer("json")
    return from(this.httpnative.post(AppConfig.domain+'/sfv3/integrumws.nsf/xp_App.xsp/submitFormV2',data,options));
  }
  getLoopupOptions(logindetail:any,para:any):Observable<any>{
    let auth='Basic '+btoa(logindetail.username+':'+logindetail.password);
    let key=para.key;
    let db = para.db;
    let view = para.view;
    let column = para.column;
    const options = {
        "Content-Type":"application/json; charset=utf-8",
        "Authorization":auth
    };
    let sparas = '&db='+db+'&view='+view+'&column='+column;
    return from(this.httpnative.get(AppConfig.domain+'/sfv3/integrumws.nsf/xp_App.xsp/getLookupOption?key='+key+sparas,'',options));
  }

}
