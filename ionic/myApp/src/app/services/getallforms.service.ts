import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable,from } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { CommonService } from './common.service';
import { HTTP } from '@ionic-native/http/ngx';
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
    return from(this.httpnative.get(logindetail.server+'/'+logindetail.folder+'/integrumws.nsf/xp_App.xsp/getAllForms?ver=v2&languageid&cnname='+encodeURIComponent(logindetail.username),'',options));
  }


  getFormData(logindetail:any,para:any ):Observable<any>{
    let auth='Basic '+btoa(logindetail.username+':'+logindetail.password);
    let unid=para.unid
    let isedit = para.isedit;
    const options = {
        "Content-Type":"application/json; charset=utf-8",
        "Authorization":auth
    };
    let param:string = logindetail.server+'/'+logindetail.folder+'/integrumws.nsf/xp_App.xsp/getDocInfoV2?unid='+encodeURIComponent(unid)+'&isedit='+encodeURIComponent(isedit);
    return from(this.httpnative.get(param,'',options));
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
    return from(this.httpnative.post(logindetail.server+'/'+logindetail.folder+'/integrumws.nsf/xp_App.xsp/submitFormV2',data,options));
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
    let sparas:string = `&db=${encodeURIComponent(db)}&view=${encodeURIComponent(view)}&column=${encodeURIComponent(column)}`;
    let param:string = `${logindetail.server}/${logindetail.folder}/integrumws.nsf/xp_App.xsp/getLookupOption?key=${encodeURIComponent(key)}${sparas}`
    return from(this.httpnative.get(param,'',options));
  }
  doDeleteDoc(logindetail:any,para:any):Observable<any>{
    let auth='Basic '+btoa(logindetail.username+':'+logindetail.password);

    const unid:string = para.unid;
    const cm:string   = para.cm;
    const options = {
      "Content-Type":"application/json; charset=utf-8",
      "Authorization":auth
    };
    let param:string = `${logindetail.server}/${logindetail.folder}/integrumws.nsf/xp_App.xsp/deleteDoc?unid=${encodeURIComponent(unid)}$cm=${encodeURIComponent(cm)}`
    return from(this.httpnative.get(param,'',options));
    
  }

}
