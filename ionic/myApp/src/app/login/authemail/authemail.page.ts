import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService} from '../../services/authentication.service';
import { first } from 'rxjs/operators';
import { AlertController,NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { FormControl, FormGroup, Validators ,FormBuilder} from '@angular/forms'; 
import { GetousService } from "../../services/getous.service";
import { GetpersoninfoService } from "../../services/getpersoninfo.service";
import { TranslateService } from '@ngx-translate/core';
import { GetallformsService } from "../../services/getallforms.service";

@Component({
  selector: 'app-authemail',
  templateUrl: './authemail.page.html',
  styleUrls: ['./authemail.page.scss'],
})
export class AuthemailPage implements OnInit {

  public email: any;
  public code: any ;
  public sendStat:Boolean;
  public year:string ;
  public user:string ;
  public pass: string ;
  public authform : FormGroup;
  public resmsg:string;
  public name:any;
  public password:any;
  public server:string;
  public folder:string;
  public loginDetails ={
      email:"",
      code:"",
      OUCategory:"",
      server:"",
      folder:"",
      username:"",
      password:"",
      empgroup:""
  }
  constructor(public  alertController:AlertController,private auth: AuthenticationService,private router: Router
    ,private storage:Storage,
    private formBuilder: FormBuilder,
    private getou:GetousService,
    private getpsn:GetpersoninfoService,
    private translate:TranslateService,
    private getallforms:GetallformsService,
    public navCtrl:NavController
    ) {
      this.authform = formBuilder.group({
        code: ['', Validators.required],
        name: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([ Validators.required])],      
      });
      this.email = this.authform.controls['email']
      this.code = this.authform.controls['code'];
      this.name= this.authform.controls['name'];
      this.password= this.authform.controls['password'];

     }

  ngOnInit() {
    this.sendStat=true;
    this.year = new Date().getFullYear().toString();
  }
 
  SendEmail(){
    this.auth.sendEmail(this.authform.value.code)
      .pipe(first())
      .subscribe(
        result => 
        {
          result=JSON.parse(result.data)
          console.log("SendEmail-->result:",result)
          if(result.status!="fail"){
            this.sendStat=true;
            //this.router.navigate(['loginpass'])
            this.user=this.authform.value.name
            this.pass=this.authform.value.password
            this.code = this.authform.value.code;
            this.server=result.server
            this.folder=result.folder

            this.loginDetails.username = this.user;
            this.loginDetails.password = this.pass;
            this.loginDetails.server = this.server;
            this.loginDetails.folder = this.folder;
            this.loginDetails.code = this.code;

            this.storage.set("loginDetails",this.loginDetails)
           
            this.Login();
          }else{
             this.translate.get('login').subscribe((res: any) => {
             this.resmsg=res.authmailerr;
          }).add(this.translate.get('alert').subscribe((res: any) => {
              this.presentAlert( this.resmsg,res.title,res.btn);
          }));
           
          }
        }
      );
  }
  Login() {
   
    this.auth.login(this.user, this.pass, this.server, this.folder)
      .pipe(first())
      .subscribe(
        result => {
          if (result.data.indexOf('DOCTYPE') == -1) {
            result = JSON.parse(result.data)
            if (result.returnResponse == "Success") {
              this.user = result.user.username;
              this.loginDetails.username = this.user;
              this.loginDetails.password = this.pass;
              this.loginDetails.server = this.server;
              this.loginDetails.folder = this.folder;
              this.loginDetails.code = this.code;
              this.loginDetails.email = result.user.email;
              this.loginDetails.OUCategory = result.user.oucategory;

              this.storage.set("loginDetails",this.loginDetails)
              this.auth.updateUserInfo(this.loginDetails).pipe(first()).subscribe(
                data => {
                  data = JSON.parse(data.data);
                  this.loginDetails.OUCategory = data.OUCategory;
                  const EmpCurrentPortal = data.EmpCurrentPortal;
                  this.loginDetails.empgroup = EmpCurrentPortal;
                  console.log('updateUserInfo---->this.loginDetails:',this.loginDetails)
                  localStorage.setItem('EmpCurrentPortal',EmpCurrentPortal)
                  this.storage.set("loginDetails",this.loginDetails)
                }
              )
              var curtime = new Date();
              console.log('-->starttime:',curtime.toLocaleTimeString());
              localStorage.setItem('hasLogged','true');
              localStorage.setItem('user',this.user);
              this.getou.getous(this.user, this.pass, this.server, this.folder).pipe(first()).subscribe(
                data => {
                  const otime = new Date();
                  console.log('getous--otime.toLocaleTimeString:',otime.toLocaleTimeString(),'-->starttime:',curtime.toLocaleTimeString());
                  data = JSON.parse(data.data);
                  this.storage.set('ous', JSON.stringify(data));
                }
              )
              this.getpsn.getpersoninfo(this.user, this.pass, this.server, this.folder).pipe(first()).subscribe(
                data => {
                  const otime = new Date();
                  console.log('getpersoninfo--otime.toLocaleTimeString:',otime.toLocaleTimeString(),'-->starttime:',curtime.toLocaleTimeString());
                  data = JSON.parse(data.data);
                  this.storage.set('psninfo', JSON.stringify(data));
                }
              )
              this.getallforms.getAllForms(this.loginDetails).pipe(first()).subscribe(data => {
                const otime = new Date();
                  console.log('getAllForms--otime.toLocaleTimeString:',otime.toLocaleTimeString(),'-->starttime:',curtime.toLocaleTimeString());
                data = JSON.parse(data.data);
                this.storage.set('allforms', JSON.stringify(data));
              })
              this.router.navigate(['tabs/tab1'])

            } else {
              //this.presentAlert("password error！");
              this.translate.get('login').subscribe((res: any) => {
                this.resmsg = res.authpasserr;
              }).add(this.translate.get('alert').subscribe((res: any) => {
                this.presentAlert(this.resmsg, res.title, res.btn);
              }));
            }
          } else {
            //this.presentAlert("password error！");
            this.translate.get('login').subscribe((res: any) => {
              this.resmsg = res.authpasserr;
            }).add(this.translate.get('alert').subscribe((res: any) => {
              this.presentAlert(this.resmsg, res.title, res.btn);
            }));
          }
        },
      );
  }
  // 
  async presentAlert(msg:string,header:string,btn:string) {

    const alert = await this.alertController.create({
      header: header,
      subHeader: '',
      message: msg,
      buttons: [btn]
    });

    await alert.present();
  }
  onchange(){
  
   
  }
}
